import z from "zod";

export const CreateCampaignMetadataDtoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  creator: z.string().min(1, "Creator is required"),
  imageUrl: z.string(),
  campaignId: z.number(),
});

export type CreateCampaignMetadataDto = z.infer<typeof CreateCampaignMetadataDtoSchema>;
export interface CreateCampaignMetadataResponseDto {
  cid: string;
  ipfsUrl: string;
}
