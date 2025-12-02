import { z } from "zod";

export const LoginWalletSchema = z.object({
  nonce: z.string().min(1, "Nonce is required"),
  address: z.string().toLowerCase().trim(),
  signature: z.string().min(1, "Signature is required"),
});

export type LoginWalletDto = z.infer<typeof LoginWalletSchema>;
