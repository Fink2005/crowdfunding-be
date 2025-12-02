import { z } from "zod";

export const VerifySignatureDtoSchema = z.object({
  nonce: z.string().min(1, "Nonce is required"),
  address: z.string().toLowerCase().trim(),
  signature: z.string().min(1, "Signature is required"),
});

export type VerifySignatureDto = z.infer<typeof VerifySignatureDtoSchema>;
