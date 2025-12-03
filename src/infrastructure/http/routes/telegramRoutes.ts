import { GetTelegramLinkUseCase } from "@/application/use-cases/telegram/GetTelegramLinkUseCase";
import { HandleTelegramWebhookUseCase } from "@/application/use-cases/telegram/HandleTelegramWebhookUseCase";
import { SaveChatIdUseCase } from "@/application/use-cases/telegram/SaveChatIdUseCase";
import { SendTelegramNotificationUseCase } from "@/application/use-cases/telegram/SendTelegramNotificationUseCase";
import { TelegramController } from "@/infrastructure/http/controllers/TelegramController";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";
import { Router } from "express";

const router = Router();

// Dependency Injection
const userRepository = new MongooseUserRepository();
const getTelegramLinkUseCase = new GetTelegramLinkUseCase();
const saveChatIdUseCase = new SaveChatIdUseCase(userRepository);
const handleTelegramWebhookUseCase = new HandleTelegramWebhookUseCase(saveChatIdUseCase);
const sendTelegramNotificationUseCase = new SendTelegramNotificationUseCase(userRepository);

const telegramController = new TelegramController(
  getTelegramLinkUseCase,
  handleTelegramWebhookUseCase,
  sendTelegramNotificationUseCase
);

/**
 * @swagger
 * /telegram/link:
 *   get:
 *     tags:
 *       - Telegram
 *     summary: Get Telegram bot link and redirect
 *     description: Generate a Telegram bot link with wallet address and redirect user to Telegram
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
 *       302:
 *         description: Redirects to Telegram bot with encoded wallet address
 *         headers:
 *           Location:
 *             description: Telegram bot URL
 *             schema:
 *               type: string
 *               example: "https://t.me/YourBot?start=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *       400:
 *         description: Invalid or missing wallet address
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
router.get("/link", (req, res, next) => telegramController.getLink(req, res, next));

/**
 * @swagger
 * /telegram/webhook:
 *   post:
 *     tags:
 *       - Telegram
 *     summary: Telegram webhook handler
 *     description: Receives webhook events from Telegram bot (called by Telegram servers)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "/start 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *                   chat:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 123456789
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/webhook", (req, res, next) => telegramController.handleWebhook(req, res, next));

/**
 * @swagger
 * /telegram/notify:
 *   post:
 *     tags:
 *       - Telegram
 *     summary: Send notification to user via Telegram
 *     description: Send a custom notification message to a user's connected Telegram account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - message
 *             properties:
 *               address:
 *                 type: string
 *                 pattern: '^0x[a-fA-F0-9]{40}$'
 *                 description: Ethereum wallet address of the user
 *                 example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *               message:
 *                 type: string
 *                 description: Message to send to the user (supports HTML formatting)
 *                 example: "🎉 <b>Congratulations!</b> Your campaign has received a new contribution!"
 *     responses:
 *       200:
 *         description: Notification sent successfully
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
 *                   example: "Notification sent successfully"
 *       400:
 *         description: Bad request (missing fields, user not found, or Telegram not connected)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Address and message are required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/notify", (req, res, next) => telegramController.sendNotification(req, res, next));

export default router;
