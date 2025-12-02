import { GetMessageWithNonceDtoSchema } from "@/application/dto/GetMessageWithNonceDto";
import { LoginWalletSchema } from "@/application/dto/LoginWalletDto";
import { GetMessageWithNonceUseCase } from "@/application/use-cases/GetMesageWithNonceUseCase";
import { LoginWalletUseCase } from "@/application/use-cases/LoginWalletUseCase";
import { VerifySignatureCase } from "@/application/use-cases/VerifySignatureCase";
import { AuthController } from "@/infrastructure/http/controllers/AuthController";
import { validateRequest } from "@/infrastructure/http/middlewares/validateRequest";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";
import { RedisCacheService } from "@/infrastructure/services/RedisCacheService";
import { Router } from "express";

const router = Router();

const userRepository = new MongooseUserRepository();

const cacheService = new RedisCacheService();

const getMessageWithNonceUseCase = new GetMessageWithNonceUseCase(cacheService);

const verifySignatureCase = new VerifySignatureCase(cacheService);
const loginWalletUseCase = new LoginWalletUseCase(verifySignatureCase, userRepository);

const authController = new AuthController(loginWalletUseCase, getMessageWithNonceUseCase);

/**
 * @swagger
 * /auth/message-nonce:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Get nonce message for wallet signature
 *     description: Returns a message with nonce that user needs to sign with their Web3 wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 type: string
 *                 example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *     responses:
 *       200:
 *         description: Nonce message generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sign this message to authenticate: 123456"
 *       400:
 *         description: Invalid wallet address
 */
router.post("/message-nonce", validateRequest(GetMessageWithNonceDtoSchema), (req, res, next) =>
  authController.getMessageWithNonce(req, res, next)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login with Web3 wallet
 *     description: Verify wallet signature and login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWalletRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginWalletResponse'
 *       401:
 *         description: Invalid signature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", validateRequest(LoginWalletSchema), (req, res, next) =>
  authController.login(req, res, next)
);

export default router;
