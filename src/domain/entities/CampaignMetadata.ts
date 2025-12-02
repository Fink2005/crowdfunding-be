export interface CampaignMetadata {
  id?: string;
  creator: string;
  title: string;
  ipfsUri?: string;
  cid?: string;
  campaignId: number;
  description: string;
  imageUrl?: string;
  isSyncOnChain?: boolean;
  createdAt?: Date;
}
