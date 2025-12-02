import env from "@/infrastructure/config/env";
import { dirname, join } from "path";
import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 📚 Swagger/OpenAPI Configuration
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crowdfunding API",
      version: "1.0.0",
      description: "API documentation for Crowdfunding Backend with Clean Architecture",
      contact: {
        name: "API Support",
        email: "support@crowdfunding.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: "Development server",
      },
      {
        url: "https://api.fundhive.pro.vn",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        // ==========================================
        // Auth Schemas
        // ==========================================

        LoginWalletRequest: {
          type: "object",
          required: ["walletAddress", "signature"],
          properties: {
            walletAddress: {
              type: "string",
              pattern: "^0x[a-fA-F0-9]{40}$",
              example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              description: "Ethereum wallet address",
            },
            signature: {
              type: "string",
              example:
                "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
              description: "Signed message signature",
            },
          },
        },
        LoginWalletResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Login successful",
            },
            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
              description: "User database ID",
            },
            address: {
              type: "string",
              pattern: "^0x[a-fA-F0-9]{40}$",
              example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              description: "Ethereum wallet address",
            },
            chatId: {
              type: "string",
              example: "123456789",
              description: "Telegram chat ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        // ==========================================
        // Campaign Schemas
        // ==========================================
        CreateCampaignRequest: {
          type: "object",
          required: ["title", "description", "creator"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              example: "Help Build a School",
              description: "Campaign title",
            },
            description: {
              type: "string",
              minLength: 1,
              example: "We need help to build a school in a rural area",
              description: "Detailed campaign description",
            },
            imageUrl: {
              type: "string",
              format: "uri",
              example: "https://example.com/image.jpg",
              description: "URL to campaign cover image (optional)",
            },
            creator: {
              type: "string",
              pattern: "^0x[a-fA-F0-9]{40}$",
              minLength: 42,
              maxLength: 42,
              example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              description: "Ethereum wallet address of campaign creator",
            },
          },
        },
        CampaignResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Campaign metadata created successfully",
            },
            data: {
              type: "object",
              properties: {
                cid: {
                  type: "string",
                  example: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
                  description: "IPFS Content Identifier - use this to retrieve metadata",
                },
              },
            },
          },
        },
        CampaignMetadata: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
              description: "Database ID",
            },
            creator: {
              type: "string",
              example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              description: "Creator wallet address",
            },
            title: {
              type: "string",
              example: "Help Build a School",
            },
            description: {
              type: "string",
              example: "Building a school in rural area",
            },
            imageUrl: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
            ipfsUri: {
              type: "string",
              example: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
              description: "IPFS URI of the metadata",
            },
            campaignId: {
              type: "number",
              example: 1,
              description: "On-chain campaign ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        // ==========================================
        // Error Schemas
        // ==========================================
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  example: "VALIDATION_ERROR",
                  description: "Error code",
                },
                message: {
                  type: "string",
                  example: "Validation failed",
                  description: "Human-readable error message",
                },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      field: {
                        type: "string",
                        example: "walletAddress",
                      },
                      message: {
                        type: "string",
                        example: "Invalid wallet address format",
                      },
                    },
                  },
                  description: "Validation error details",
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints (Email/Password & Web3 Wallet)",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Telegram",
        description: "Telegram bot integration endpoints",
      },
      {
        name: "Campaigns",
        description: "Campaign management endpoints",
      },
      {
        name: "Media",
        description: "Media upload and file storage endpoints",
      },
    ],
  },
  // Scan routes from source files - works with ts-node and build output
  apis: [join(__dirname, "../http/routes/*.ts"), join(__dirname, "../http/routes/*.js")],
};

console.log("📂 Swagger scanning paths:", swaggerOptions.apis);
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log(
  "📚 Swagger spec generated. Paths found:",
  Object.keys((swaggerSpec as any).paths || {})
);
