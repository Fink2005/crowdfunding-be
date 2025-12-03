import { GetUserByAddressUseCase } from "@/application/use-cases/user/GetUserByAddressUseCase";
import { UserController } from "@/infrastructure/http/controllers/UserController";
import { MongooseCampaignRepository } from "@/infrastructure/persistence/repositories/MongooseCampaignRepository";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";
import { Router } from "express";

const router = Router();

const userRepository = new MongooseUserRepository();
const campaignRepository = new MongooseCampaignRepository();
const getUserByAddressUseCase = new GetUserByAddressUseCase(userRepository, campaignRepository);
const userController = new UserController(getUserByAddressUseCase);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by wallet address
 *     description: Retrieve user information by their wallet address
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^0x[a-fA-F0-9]{40}$'
 *         description: Ethereum wallet address
 *         example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     address:
 *                       type: string
 *                       example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *                     chatId:
 *                       type: string
 *                       example: "123456789"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     campaigns:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
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
 *       400:
 *         description: Wallet address is required
 *       404:
 *         description: User not found
 */
router.get("/me", (req, res, next) => userController.getMe(req, res, next));

export default router;
