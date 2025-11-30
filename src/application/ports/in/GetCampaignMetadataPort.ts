export interface GetCampaignMetadataPort {
  execute(campaignId: number): Promise<string>;
}
