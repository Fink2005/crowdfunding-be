import { CampaignMetadataStorageServicePort } from "@/application/ports/out/CampaignMetadataStoragePort";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";
import env from "@/infrastructure/config/env";

import * as w3up from "@web3-storage/w3up-client";
import { Blob } from "buffer";

export class Web3UpCampaignMetadataService implements CampaignMetadataStorageServicePort {
  private spaceDid: string | null = null;
  private client: w3up.Client | null = null;

  private async init() {
    if (this.client && this.spaceDid) return;

    this.client = await w3up.create();

    await this.client.login(env.w3upEmail as any);

    const spaces = this.client.spaces();

    if (spaces.length === 0) {
      await this.client.createSpace("crowdfunding-space");
    }

    const space = this.client.spaces()[1];
    this.spaceDid = space.did();

    await this.client.setCurrentSpace(this.spaceDid as any);
  }

  async saveMetadata(metadata: CampaignMetadata): Promise<string> {
    await this.init();

    const blob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });

    const cid = await this.client!.uploadFile(blob as any);

    console.log("[w3up] Metadata uploaded CID:", cid.toString());

    return cid.toString();
  }
}
