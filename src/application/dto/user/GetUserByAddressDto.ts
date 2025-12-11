import { z } from "zod";

export const GetUserByAddressDtoSchema = z.object({
  address: z.string(),
});

export type GetUserByAddressDto = z.infer<typeof GetUserByAddressDtoSchema>;
