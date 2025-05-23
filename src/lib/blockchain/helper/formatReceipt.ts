// src/lib/utils/formatReceipt.ts
import { decodeEventLog, formatEther, type TransactionReceipt } from 'viem';
import { publicClient } from '../clients/publicClient';
import { abi } from '../contracts/CafereumAbi.json';

export interface FormattedReceipt {
	productType?: string;
	productStrength?: string;
	amountUMETH: string;
	blockNumber: bigint;
	txHash: `0x${string}`;
	timestamp?: string; // ISO formatted
}

export async function formatReceipt(receipt: TransactionReceipt): Promise<FormattedReceipt> {
	let productType: string | undefined;
	let productStrength: string | undefined;
	let amountUMETH = 'unknown';
	let timestamp: string | undefined;

	// 1) Decode our ProductPurchased event
	for (const log of receipt.logs) {
		try {
			const decoded = decodeEventLog({
				abi,
				data: log.data,
				topics: log.topics
			});

			if (decoded.eventName === 'ProductPurchased') {
				// Hacky solution, but working with the chain is really
				// inconvenient in terms of typing things ..
				const args = decoded.args as unknown as { productType: string; productStrength: string };
				productType = args.productType;
				productStrength = args.productStrength;
				break;
			}
		} catch {
			// ignore non-matching logs
		}
	}

	// 2+3) Fire both RPC calls in parallel to save performance
	const [txResult, blockResult] = await Promise.allSettled([
		publicClient.getTransaction({ hash: receipt.transactionHash }),
		publicClient.getBlock({ blockNumber: receipt.blockNumber })
	]);

	if (txResult.status === 'fulfilled' && txResult.value) {
		amountUMETH = formatEther(txResult.value.value);
	}
	if (blockResult.status === 'fulfilled' && blockResult.value) {
		timestamp = new Date(Number(blockResult.value.timestamp) * 1000).toISOString();
	}

	return {
		productType,
		productStrength,
		amountUMETH,
		blockNumber: receipt.blockNumber,
		txHash: receipt.transactionHash,
		timestamp
	};
}
