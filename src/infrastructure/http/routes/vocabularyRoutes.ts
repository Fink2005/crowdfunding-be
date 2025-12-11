import { CreateVocabularyDtoSchema } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { SubmitQuizDtoSchema } from "@/application/dto/vocabulary/SubmitQuizDto";
import { UpdateVocabularyDtoSchema } from "@/application/dto/vocabulary/UpdateVocabularyDto";
import { CreateVocabularyUseCase } from "@/application/use-cases/vocabulary/CreateVocabularyUseCase";
import { DeleteVocabularyUseCase } from "@/application/use-cases/vocabulary/DeleteVocabularyUseCase";
import { GenerateQuizUseCase } from "@/application/use-cases/vocabulary/GenerateQuizUseCase";
import { GetAllVocabularyUseCase } from "@/application/use-cases/vocabulary/GetAllVocabularyUseCase";
import { GetWordsUseCase } from "@/application/use-cases/vocabulary/GetWordsUseCase";
import { SubmitQuizUseCase } from "@/application/use-cases/vocabulary/SubmitQuizUseCase";
import { UpdateVocabularyUseCase } from "@/application/use-cases/vocabulary/UpdateVocabularyUseCase";
import { VocabularyController } from "@/infrastructure/http/controllers/VocabularyController";
import { validateRequest } from "@/infrastructure/http/middlewares/validateRequest";
import { MongooseQuizRepository } from "@/infrastructure/persistence/repositories/MongooseQuizRepository";
import { MongooseVocabularyRepository } from "@/infrastructure/persistence/repositories/MongooseVocabularyRepository";
import { Router } from "express";

const router = Router();

// Dependency Injection
const vocabularyRepository = new MongooseVocabularyRepository();
const quizRepository = new MongooseQuizRepository();

const createVocabularyUseCase = new CreateVocabularyUseCase(vocabularyRepository);
const getAllVocabularyUseCase = new GetAllVocabularyUseCase(vocabularyRepository);
const updateVocabularyUseCase = new UpdateVocabularyUseCase(vocabularyRepository);
const deleteVocabularyUseCase = new DeleteVocabularyUseCase(vocabularyRepository);
const getWordsUseCase = new GetWordsUseCase(vocabularyRepository);
const generateQuizUseCase = new GenerateQuizUseCase(vocabularyRepository);
const submitQuizUseCase = new SubmitQuizUseCase(quizRepository, vocabularyRepository);

const vocabularyController = new VocabularyController(
  createVocabularyUseCase,
  getAllVocabularyUseCase,
  updateVocabularyUseCase,
  deleteVocabularyUseCase,
  getWordsUseCase,
  generateQuizUseCase,
  submitQuizUseCase
);

/**
 * @swagger
 * /vocabulary:
 *   post:
 *     tags:
 *       - Vocabulary
 *     summary: Create a new vocabulary word
 *     description: Add a new vocabulary word to the database (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - word
 *               - meaning
 *               - sourceLang
 *               - targetLang
 *             properties:
 *               word:
 *                 type: string
 *                 description: The word in source language
 *                 example: "hello"
 *               meaning:
 *                 type: string
 *                 description: The meaning in target language
 *                 example: "xin chào"
 *               sourceLang:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 10
 *                 description: The source language code
 *                 example: "en"
 *               targetLang:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 10
 *                 description: The target language code
 *                 example: "vi"
 *               example:
 *                 type: string
 *                 description: Example sentence using the word (optional)
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Vocabulary created successfully
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
 *                   example: "Vocabulary created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     word:
 *                       type: string
 *                       example: "hello"
 *                     meaning:
 *                       type: string
 *                       example: "xin chào"
 *                     sourceLang:
 *                       type: string
 *                       example: "en"
 *                     targetLang:
 *                       type: string
 *                       example: "vi"
 *                     example:
 *                       type: string
 *                       example: "Hello, how are you?"
 *       400:
 *         description: Invalid request data
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
 *                   example: "Word is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", validateRequest(CreateVocabularyDtoSchema), (req, res, next) =>
  vocabularyController.createVocabulary(req, res, next)
);

/**
 * @swagger
 * /vocabulary/words:
 *   get:
 *     tags:
 *       - Vocabulary
 *     summary: Get all vocabulary words by language pair
 *     description: Retrieve all vocabulary words for a specific source and target language pair
 *     parameters:
 *       - in: query
 *         name: sourceLang
 *         required: true
 *         schema:
 *           type: string
 *         description: The language to learn (e.g., "en" for English)
 *         example: "en"
 *       - in: query
 *         name: targetLang
 *         required: true
 *         schema:
 *           type: string
 *         description: The native language for translations (e.g., "vi" for Vietnamese)
 *         example: "vi"
 *     responses:
 *       200:
 *         description: Successfully retrieved vocabulary words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       word:
 *                         type: string
 *                         example: "hello"
 *                       meaning:
 *                         type: string
 *                         example: "xin chào"
 *                       sourceLang:
 *                         type: string
 *                         example: "en"
 *                       targetLang:
 *                         type: string
 *                         example: "vi"
 *                       example:
 *                         type: string
 *                         example: "Hello, how are you?"
 *       400:
 *         description: Missing required parameters
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
 *                   example: "sourceLang and targetLang are required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/words", (req, res, next) => vocabularyController.getWords(req, res, next));

/**
 * @swagger
 * /vocabulary/quiz:
 *   get:
 *     tags:
 *       - Vocabulary
 *     summary: Generate a random quiz
 *     description: Generate a quiz with 10 random vocabulary words with multiple choice answers
 *     parameters:
 *       - in: query
 *         name: sourceLang
 *         required: true
 *         schema:
 *           type: string
 *         description: The language to learn (e.g., "en" for English)
 *         example: "en"
 *       - in: query
 *         name: targetLang
 *         required: true
 *         schema:
 *           type: string
 *         description: The native language for translations (e.g., "vi" for Vietnamese)
 *         example: "vi"
 *     responses:
 *       200:
 *         description: Successfully generated quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       word:
 *                         type: string
 *                         example: "hello"
 *                       answer:
 *                         type: string
 *                         example: "xin chào"
 *                       choices:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["xin chào", "tạm biệt", "cảm ơn", "xin lỗi"]
 *       400:
 *         description: Missing required parameters
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
 *                   example: "sourceLang and targetLang are required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/quiz", (req, res, next) => vocabularyController.generateQuiz(req, res, next));

/**
 * @swagger
 * /vocabulary/quiz/submit:
 *   post:
 *     tags:
 *       - Vocabulary
 *     summary: Submit quiz answers and get score
 *     description: Submit user's quiz answers, calculate score, and save result to database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - answers
 *             properties:
 *               address:
 *                 type: string
 *                 pattern: '^0x[a-fA-F0-9]{40}$'
 *                 description: User's Ethereum wallet address
 *                 example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - wordId
 *                     - selected
 *                   properties:
 *                     wordId:
 *                       type: string
 *                       description: The ID of the vocabulary word
 *                       example: "507f1f77bcf86cd799439011"
 *                     selected:
 *                       type: string
 *                       description: The answer selected by the user
 *                       example: "xin chào"
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: number
 *                       description: Number of correct answers
 *                       example: 8
 *                     total:
 *                       type: number
 *                       description: Total number of questions
 *                       example: 10
 *       400:
 *         description: Invalid request data
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
 *                   example: "Address is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/quiz/submit", validateRequest(SubmitQuizDtoSchema), (req, res, next) =>
  vocabularyController.submitQuiz(req, res, next)
);

/**
 * @swagger
 * /vocabulary:
 *   get:
 *     tags:
 *       - Vocabulary
 *     summary: Get all vocabulary words
 *     description: Retrieve all vocabulary words from the database
 *     responses:
 *       200:
 *         description: Vocabularies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       word:
 *                         type: string
 *                       meaning:
 *                         type: string
 *                       sourceLang:
 *                         type: string
 *                       targetLang:
 *                         type: string
 *                       example:
 *                         type: string
 */
router.get("/", (req, res, next) => vocabularyController.getAllVocabulary(req, res, next));

/**
 * @swagger
 * /vocabulary/{id}:
 *   put:
 *     tags:
 *       - Vocabulary
 *     summary: Update a vocabulary word
 *     description: Update an existing vocabulary word by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vocabulary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *               meaning:
 *                 type: string
 *               sourceLang:
 *                 type: string
 *               targetLang:
 *                 type: string
 *               example:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vocabulary updated successfully
 *       404:
 *         description: Vocabulary not found
 */
router.put("/:id", validateRequest(UpdateVocabularyDtoSchema), (req, res, next) =>
  vocabularyController.updateVocabulary(req, res, next)
);

/**
 * @swagger
 * /vocabulary/{id}:
 *   delete:
 *     tags:
 *       - Vocabulary
 *     summary: Delete a vocabulary word
 *     description: Delete a vocabulary word by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vocabulary ID
 *     responses:
 *       200:
 *         description: Vocabulary deleted successfully
 *       404:
 *         description: Vocabulary not found
 */
router.delete("/:id", (req, res, next) => vocabularyController.deleteVocabulary(req, res, next));

export default router;
