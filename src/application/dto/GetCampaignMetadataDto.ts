import z from "zod";

const GetCampaignMetaDataSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1),
});
export type GetCampaignMetaDataDto = z.infer<typeof GetCampaignMetaDataSchema>;
