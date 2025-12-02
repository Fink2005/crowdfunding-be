import { ContributionModel } from "@/infrastructure/persistence/models/ContributionModel";
import { contractAbi, contractAddress, wsClient } from "../contract/ContractClient";

export async function listenContribution() {
  wsClient.watchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: contractAbi,
    eventName: "Contributed",
    onLogs: async (logs) => {
      for (const log of logs) {
        const { id, contributor, amount } = (log as any).args as {
          id: bigint;
          contributor: string;
          amount: bigint;
        };

        console.log("💸 Event: Contributed", {
          id,
          contributor,
          amount,
        });

        await ContributionModel.create({
          campaignId: Number(id),
          contributor,
          amount: amount.toString(),
          timestamp: Date.now(),
          txHash: log.transactionHash,
        });

        console.log("💾 Saved Contribution:", log.transactionHash);
      }
    },
  });
}
