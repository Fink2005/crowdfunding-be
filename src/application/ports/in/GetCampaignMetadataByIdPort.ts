export interface GetCampaignMetadataByIdPort {
  execute(input: { id: string }): Promise<any>;
}
