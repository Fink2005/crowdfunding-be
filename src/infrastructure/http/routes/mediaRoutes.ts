import { GenerateUploadUrlDtoSchema } from "@/application/dto/GenerateUploadUrlDto";
import { GenerateUploadUrlUseCase } from "@/application/use-cases/media/GenerateUploadUrlUseCase";
import { MediaController } from "@/infrastructure/http/controllers/MediaController";
import { validateQuery } from "@/infrastructure/http/middlewares/validateRequest";
import { R2ObjectStorageService } from "@/infrastructure/services/R2ObjectStorageService";
import { Router } from "express";

const router = Router();
const storage = new R2ObjectStorageService();
const generateUploadUrlUseCase = new GenerateUploadUrlUseCase(storage);

const mediaController = new MediaController(generateUploadUrlUseCase);

/**
 * @swagger
 * /media/presign-url:
 *   get:
 *     tags:
 *       - Media
 *     summary: Generate presigned presign URL
 *     description: |
 *       Generate a presigned URL for presigning files to Cloudflare R2 storage.
 *       Use this URL to presign files directly from client without going through backend.
 *     parameters:
 *       - in: query
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the file to presign
 *         example: "campaign-image.jpg"
 *       - in: query
 *         name: fileType
 *         required: true
 *         schema:
 *           type: string
 *         description: MIME type of the file
 *         example: "image/jpeg"
 *     responses:
 *       200:
 *         description: Presigned URL generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 presignUrl:
 *                   type: string
 *                   format: uri
 *                   example: "https://r2.cloudflarestorage.com/bucket/file?X-Amz-Algorithm=..."
 *                   description: Presigned URL for presigning (valid for 1 hour)
 *             example:
 *               presignUrl: "https://r2.cloudflarestorage.com/bucket/campaign-image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to generate presign URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/presign-url", validateQuery(GenerateUploadUrlDtoSchema), (req, res, next) =>
  mediaController.getSignedUrl(req, res, next)
);

export default router;
