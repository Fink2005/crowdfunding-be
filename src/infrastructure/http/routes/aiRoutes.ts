import { GenerateContentDtoSchema } from "@/application/dto/ai/GenerateContentDto";
import { GenerateContentUseCase } from "@/application/use-cases/ai/GenerateContentUseCase";
import { AIController } from "@/infrastructure/http/controllers/AIController";
import { validateRequest } from "@/infrastructure/http/middlewares/validateRequest";
import { GeminiService } from "@/infrastructure/services/GeminiService";
import { Router } from "express";

const router = Router();

const geminiService = new GeminiService();
const generateContentUseCase = new GenerateContentUseCase(geminiService);
const aiController = new AIController(generateContentUseCase);

/**
 * @swagger
 * /ai/generate:
 *   post:
 *     tags:
 *       - AI
 *     summary: Generate content using Gemini AI
 *     description: Send a prompt to Gemini AI and receive generated content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt to send to Gemini AI
 *                 example: "Write a short description for a crowdfunding campaign about building a school"
 *     responses:
 *       200:
 *         description: Content generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: The generated content from Gemini AI
 *                   example: "Help us build a brighter future for children in rural areas..."
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to generate content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/generate", validateRequest(GenerateContentDtoSchema), (req, res, next) =>
  aiController.generateContent(req, res, next)
);

export default router;
