type Chain = "eth" | "matic";
type Storage = "ipfs" | "arweave";

interface FormStateTypes {
  image: File | null;
  chain: Chain;
  storage: Storage;
  collectionName: string;
  collectionSymbol: string;
  amount: number | string;
  address: string;
  description: string;
}

export type { FormStateTypes, Chain, Storage };
