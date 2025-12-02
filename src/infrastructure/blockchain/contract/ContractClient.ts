import env from "@/infrastructure/config/env";
import { createPublicClient, http, webSocket } from "viem";
import abi from "./crowdfunding.abi.json";

export const wsClient = createPublicClient({
  transport: webSocket(env.rpcWss),
});

export const httpClient = createPublicClient({
  transport: http(env.rpcHttp),
});

export const contractAddress = env.contractAddress;
export const contractAbi = abi;
