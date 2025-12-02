# 📚 API Documentation with Swagger

## 🚀 Access Swagger UI

### Local Development
```
http://localhost:4000/api-docs
```

### Swagger JSON
```
http://localhost:4000/api-docs.json
```

## 📖 Features

- ✅ **Interactive API Documentation** - Test APIs directly from browser
- ✅ **Auto-generated from Code** - JSDoc comments in route files
- ✅ **Request/Response Examples** - See exact format
- ✅ **Schema Validation** - All DTOs documented
- ✅ **Authentication Support** - JWT Bearer token
- ✅ **Error Responses** - All error codes documented

## 🎯 Available Endpoints

### Authentication
- `POST /api/auth/message-nonce` - Get nonce for wallet signature
- `POST /api/auth/login` - Login with Web3 wallet

### Campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns` - List campaigns
- `GET /api/campaigns/:id` - Get campaign details

### Health
- `GET /health` - Health check

## 🔐 Using Authentication

1. Login to get JWT token
2. Click "Authorize" button in Swagger UI
3. Enter: `Bearer <your-token>`
4. Now you can test protected endpoints

## 📝 Adding Documentation to New Routes

Add JSDoc comments above your route:

```typescript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", authenticateMiddleware, (req, res) => {
  // handler
});
```

## 🎨 Swagger UI Features

### Try it Out
1. Click on any endpoint
2. Click "Try it out"
3. Fill in parameters
4. Click "Execute"
5. See real response

### Schemas
- Click "Schemas" to see all data models
- Each schema shows:
  - Required fields
  - Field types
  - Examples
  - Validation rules

### Authorization
- Click "Authorize" button (🔒 icon)
- Enter JWT token
- Format: `Bearer eyJhbGc...`
- Click "Authorize"

## 🔧 Configuration

### swagger.ts
```typescript
// Update server URL
servers: [
  {
    url: "http://localhost:4000",
    description: "Development",
  },
  {
    url: "https://api.production.com",
    description: "Production",
  },
]
```

### Add New Schema
```typescript
// In swagger.ts > components > schemas
NewSchema: {
  type: "object",
  required: ["field1"],
  properties: {
    field1: {
      type: "string",
      example: "value",
    },
  },
}
```

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": [ ... ]
  }
}
```

## 🎓 Best Practices

### ✅ DO:
- Document all public endpoints
- Include request/response examples
- Document error responses
- Use tags to group related endpoints
- Add descriptions to schemas

### ❌ DON'T:
- Expose internal endpoints
- Include sensitive data in examples
- Forget to update docs when API changes
- Use generic error messages

## 🔗 Resources

- [Swagger Official Docs](https://swagger.io/docs/)
- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)

## 🚀 Production

### Disable in Production (Optional)
```typescript
// server.ts
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
```

### Or Protect with Authentication
```typescript
app.use(
  "/api-docs",
  authenticateMiddleware,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
```
