import { CreateCampaignMetadataDtoSchema } from "@/application/dto/CreateCampaignMetadataDto.js";
import { CreateCampaignMetadataUseCase } from "@/application/use-cases/campaign/CreateCampaignMetadataUseCase.js";
import { GetCampaignMetadataByIdUseCase } from "@/application/use-cases/campaign/GetCampaignMetadataByIdUseCase";
import { GetCampaignMetadataUseCase } from "@/application/use-cases/campaign/GetCampaignMetadataUseCase";
import { CampaignController } from "@/infrastructure/http/controllers/CampaignController.js";
import { validateRequest } from "@/infrastructure/http/middlewares/validateRequest";
import { MongooseCampaignRepository } from "@/infrastructure/persistence/repositories/MongooseCampaignRepository";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";
import { Web3UpCampaignMetadataService } from "@/infrastructure/services/Web3StorageCampaignMetadataService";
import { Router } from "express";

const router = Router();

// Dependency Injection (Manual)
const metadataStorageAdapter = new Web3UpCampaignMetadataService();
const campaignRepository = new MongooseCampaignRepository();
const userRepository = new MongooseUserRepository();
const createMetadataUseCase = new CreateCampaignMetadataUseCase(
  metadataStorageAdapter,
  campaignRepository,
  userRepository
);

const getMetadataUseCase = new GetCampaignMetadataUseCase(campaignRepository);
const getMetadataByIdUseCase = new GetCampaignMetadataByIdUseCase(campaignRepository);

const campaignController = new CampaignController(
  createMetadataUseCase,
  getMetadataUseCase,
  getMetadataByIdUseCase
);

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
 *             campaignId: 1
 *             title: "Help Build a School"
 *             description: "We need help to build a school in a rural area. Your donation will help provide education to hundreds of children."
 *             imageUrl: "https://example.com/campaign-image.jpg"
 *             creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *
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

/**
 * @swagger
 * /campaigns/metadata:
 *   get:
 *     tags:
 *       - Campaigns
 *     summary: Get all campaigns with pagination
 *     description: Retrieve all campaign metadata with pagination support
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Number of campaigns per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Campaigns retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     campaigns:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           cid:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *                           creator:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *             example:
 *               success: true
 *               message: "Campaigns retrieved successfully"
 *               data:
 *                 campaigns:
 *                   - cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
 *                     title: "Help Build a School"
 *                     description: "We need help to build a school in a rural area."
 *                     imageUrl: "https://example.com/campaign-image.jpg"
 *                     creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *                   - cid: "bafybeiabc123xyz456def789ghi012jkl345mno678pqr901stu234vwx567"
 *                     title: "Clean Water Project"
 *                     description: "Providing clean water to remote villages."
 *                     imageUrl: "https://example.com/water-project.jpg"
 *                     creator: "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
 *                 pagination:
 *                   page: 1
 *                   limit: 10
 *                   total: 25
 *                   totalPages: 3
 *       400:
 *         description: Invalid request (invalid pagination parameters)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/metadata", (req, res, next) => campaignController.getMetadata(req, res, next));

/**
 * @swagger
 * /campaigns/metadata/{id}:
 *   get:
 *     tags:
 *       - Campaigns
 *     summary: Get campaign metadata by ID
 *     description: Retrieve a specific campaign's metadata by its database ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the campaign
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Campaign retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     cid:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     creator:
 *                       type: string
 *             example:
 *               success: true
 *               message: "Campaign retrieved successfully"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"
 *                 title: "Help Build a School"
 *                 description: "We need help to build a school in a rural area."
 *                 imageUrl: "https://example.com/campaign-image.jpg"
 *                 creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *       404:
 *         description: Campaign not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Campaign not found"
 *       400:
 *         description: Invalid campaign ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/metadata/:id", (req, res, next) => campaignController.getMetadataById(req, res, next));

export default router;
