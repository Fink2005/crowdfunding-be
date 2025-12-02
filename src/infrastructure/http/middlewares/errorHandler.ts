import { BaseException } from "@/domain/exceptions/BaseException";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * 🎯 Global Error Handler Middleware
 *
 * Xử lý tất cả errors trong application:
 * - BaseException (custom business logic errors)
 * - ZodError (validation errors)
 * - Unhandled errors
 *
 * LUÔN để middleware này ở CỰC CUỐI của middleware chain
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("[ErrorHandler] Error caught:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
  });

  // 1️⃣ Handle custom BaseException
  if (error instanceof BaseException) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
      },
    });
    return;
  }

  // 2️⃣ Handle Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: formattedErrors,
      },
    });
    return;
  }

  // 3️⃣ Handle MongoDB duplicate key error
  if (error.name === "MongoServerError" && (error as any).code === 11000) {
    res.status(409).json({
      success: false,
      error: {
        code: "DUPLICATE_KEY",
        message: "Resource already exists",
      },
    });
    return;
  }

  // 4️⃣ Handle JWT errors
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Invalid authentication token",
      },
    });
    return;
  }

  if (error.name === "TokenExpiredError") {
    res.status(401).json({
      success: false,
      error: {
        code: "TOKEN_EXPIRED",
        message: "Authentication token has expired",
      },
    });
    return;
  }

  // 5️⃣ Unhandled errors - không expose chi tiết trong production
  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      ...(isDevelopment && {
        details: error.message,
        stack: error.stack,
      }),
    },
  });
};

/**
 * 🔍 404 Not Found Handler
 *
 * Handle routes không tồn tại
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
};
