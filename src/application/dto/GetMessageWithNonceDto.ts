import z from "zod";

export const GetMessageWithNonceDtoSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

export type GetMessageWithNonceReqDto = z.infer<typeof GetMessageWithNonceDtoSchema>;

export interface GetMessageWithNonceResDto {
  message: string;
  nonce: string;
}
