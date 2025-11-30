import { CreateCampaignMetadataDtoSchema } from "@/application/dto/CreateCampaignMetadataDto";
import { CreateCampaignMetadataUseCase } from "@/application/use-cases/CreateCampaignMetadataUseCase.js";
import { CampaignController } from "@/infrastructure/http/controllers/CampaignController.js";
import { validateRequest } from "@/infrastructure/http/middlewares/validateRequest";
import { Web3UpCampaignMetadataService } from "@/infrastructure/services/Web3StorageCampaignMetadataService";
import { Router } from "express";

const router = Router();

// Dependency Injection (Manual)
const metadataStorageAdapter = new Web3UpCampaignMetadataService();
const createMetadataUseCase = new CreateCampaignMetadataUseCase(metadataStorageAdapter);
const campaignController = new CampaignController(createMetadataUseCase);

/**
 * @swagger
 * /campaigns/metadata:
 *   post:
 *     tags:
 *       - Campaigns
 *     summary: Create campaign metadata on IPFS
 *     description: |
 *       Upload campaign metadata to IPFS via Web3.Storage.
 *       Returns a CID (Content Identifier) that can be used to store on blockchain.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCampaignRequest'
 *           example:
 *             title: "Help Build a School"
 *             description: "We need help to build a school in a rural area. Your donation will help provide education to hundreds of children."
 *             imageUrl: "https://example.com/campaign-image.jpg"
 *             creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *     responses:
 *       200:
 *         description: Campaign metadata uploaded successfully to IPFS
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignResponse'
 *             example:
 *               success: true
 *               message: "Campaign metadata created successfully"
 *               data:
 *                 cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
 *       400:
 *         description: Invalid request data (missing required fields or invalid format)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error (IPFS upload failed)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/metadata", validateRequest(CreateCampaignMetadataDtoSchema), (req, res, next) =>
  campaignController.createMetadata(req, res, next)
);

export default router;
