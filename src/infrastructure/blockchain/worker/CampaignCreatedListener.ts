import { CampaignModel } from "@/infrastructure/persistence/models/CampaignModel";
import { contractAbi, contractAddress, wsClient } from "../contract/ContractClient";

export async function listenCampaignCreated() {
  const unwatch = wsClient.watchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: contractAbi,
    eventName: "CampaignCreated",
    onLogs: async (logs) => {
      for (const log of logs) {
        const args = (log as any).args as {
          campaignId: bigint;
          creator: string;
          goal: bigint;
          deadline: bigint;
        };
        const { campaignId, creator, goal, deadline } = args;

        console.log("📢 Event: CampaignCreated", {
          campaignId: campaignId.toString(),
          creator,
          goal: goal.toString(),
          deadline: deadline.toString(),
        });

        await CampaignModel.updateOne(
          { campaignId: Number(campaignId) },
          {
            creator,
            goal: goal.toString(),
            deadline: Number(deadline),
            createdAt: new Date(),
          },
          { upsert: true }
        );

        console.log("💾 Saved new Campaign:", campaignId.toString());
      }
    },
    onError: (error) => {
      console.error("❌ Error listening to CampaignCreated event:", error);
    },
  });

  console.log("👂 Listening for CampaignCreated events...");

  return unwatch;
}
