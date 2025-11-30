export const SIGN_PREFIX = "FUNDHIVE — Wallet Signature Verification";

export function createSignMessage(nonce: string, address: string) {
  return `${SIGN_PREFIX}

Address: ${address}
Nonce: ${nonce}

By signing this message, you prove ownership of your wallet.
This does not cost gas or create a transaction.`;
}
