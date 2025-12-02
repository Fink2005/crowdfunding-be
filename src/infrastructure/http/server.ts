import { swaggerSpec } from "@/infrastructure/config/swagger.js";
import { errorHandler } from "@/infrastructure/http/middlewares/errorHandler.js";
import authRoutes from "@/infrastructure/http/routes/authRoutes";
import campaignRoutes from "@/infrastructure/http/routes/campaignRoutes.js";
import mediaRoutes from "@/infrastructure/http/routes/mediaRoutes";
import telegramRoutes from "@/infrastructure/http/routes/telegramRoutes";
import usersRoutes from "@/infrastructure/http/routes/usersRoutes";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // allow cors http 4000
  app.use(cors({ origin: `http://localhost:4000` }));
  // ==========================================
  // 📚 Swagger API Documentation
  // ==========================================
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Crowdfunding API Docs",
    })
  );

  // Swagger JSON endpoint
  app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // ==========================================
  // API Routes
  // ==========================================
  app.use("/auth", authRoutes);
  app.use("/users", usersRoutes);
  app.use("/telegram", telegramRoutes);
  app.use("/campaigns", campaignRoutes);
  app.use("/media", mediaRoutes);

  // ==========================================
  // Error Handler (Must be last!)
  // ==========================================
  app.use(errorHandler);

  return app;
}
