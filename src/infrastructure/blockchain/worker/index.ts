import { listenCampaignCreated } from "@/infrastructure/blockchain/worker/CampaignCreatedListener";
import { listenContribution } from "@/infrastructure/blockchain/worker/ContributionListener";
import { connectDB } from "@/infrastructure/persistence/odm/mongoose";

async function startWorker() {
  console.log("🚀 Starting Blockchain Worker...");
  await connectDB();
  listenCampaignCreated();
  listenContribution();
  console.log("👂 Worker listening for blockchain events...");
}

startWorker();
