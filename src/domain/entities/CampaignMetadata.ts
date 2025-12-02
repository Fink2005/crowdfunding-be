export interface CampaignMetadata {
  campaignId: number;
  creator: string;
  title: string;
  ipfsUri?: string;
  cid?: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
}
