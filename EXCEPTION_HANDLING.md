# Exception Handling Architecture

## 📋 Tổng quan

Hệ thống sử dụng **centralized exception handling** với:
- ✅ Custom exception classes trong Domain layer
- ✅ Global error handler middleware
- ✅ Zod validation errors
- ✅ Consistent error response format

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Request Flow                             │
└─────────────────────────────────────────────────────────────┘

Request → Zod Validation Middleware
              ↓ (nếu lỗi)
         ZodError → Global Error Handler → Response

Request → Controller → Use Case → Repository
              ↓ (nếu lỗi)
         BaseException → Global Error Handler → Response
```

## 📁 File Structure

```
src/
├── domain/
│   └── exceptions/
│       └── BaseException.ts          # Custom exception classes
└── infrastructure/
    └── http/
        └── middlewares/
            ├── errorHandler.ts       # Global error handler
            └── validateRequest.ts    # Zod validation
```

## 🎯 Custom Exceptions

### Base Class
```typescript
export abstract class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errorCode?: string
  ) {}
}
```

### Available Exceptions

| Exception | Status Code | Use Case |
|-----------|-------------|----------|
| `ValidationException` | 400 | Input validation errors |
| `EmailAlreadyExistsException` | 409 | Duplicate email |
| `InvalidCredentialsException` | 401 | Login failed |
| `UserNotFoundException` | 404 | User not found |
| `UnauthorizedException` | 401 | Not authenticated |
| `ForbiddenException` | 403 | Not authorized |
| `DatabaseException` | 500 | Database errors |
| `ExternalServiceException` | 503 | External service errors |
| `InternalServerException` | 500 | Unexpected errors |

## 🔧 Usage Examples

### 1. Trong Use Case
```typescript
import { EmailAlreadyExistsException } from "@/domain/exceptions/BaseException";

export class RegisterUseCase {
  async execute(input: RegisterUserDto) {
    const exists = await this.userRepo.findByEmail(input.email);
    if (exists) {
      throw new EmailAlreadyExistsException(input.email);
    }
    // ...
  }
}
```

### 2. Trong Controller
```typescript
export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUseCase.execute(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error); // ✅ Pass to global error handler
    }
  }
}
```

### 3. Response Format
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Email user@example.com already exists"
  }
}
```

## 🛡️ Error Handler Priority

Global error handler xử lý theo thứ tự:

1. **BaseException** → Custom business logic errors
2. **ZodError** → Validation errors from middleware
3. **MongoServerError** → Database errors (e.g., duplicate key)
4. **JsonWebTokenError** → JWT authentication errors
5. **Unknown errors** → Catch-all 500 errors

## ✨ Best Practices

### ✅ DO
- Throw custom exceptions trong use cases
- Use `next(error)` trong controllers
- Log errors với context đầy đủ
- Return consistent error format

### ❌ DON'T
- ~~Throw generic `Error`~~
- ~~Handle errors trong controllers (để global handler xử lý)~~
- ~~Expose sensitive info trong production~~
- ~~Mix validation logic với business logic~~

## 📊 Error Response Schema

```typescript
// Success Response
{
  success: true,
  message: string,
  data: any
}

// Error Response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any  // Only in development
  }
}
```

## 🔍 Development vs Production

### Development Mode
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred",
    "details": "Cannot read property 'foo' of undefined",
    "stack": "Error: ...\n    at ..."
  }
}
```

### Production Mode
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## 🚀 Middleware Setup

```typescript
// src/infrastructure/http/server.ts
import { errorHandler, notFoundHandler } from "@/infrastructure/http/middlewares/errorHandler";

export function createServer() {
  const app = express();

  // ... routes ...

  // ⚠️ Error handlers phải để CUỐI CÙNG
  app.use(notFoundHandler);  // 404 handler
  app.use(errorHandler);      // Global error handler

  return app;
}
```

## 📝 Creating New Exceptions

```typescript
// src/domain/exceptions/BaseException.ts

export class MyCustomException extends BaseException {
  constructor(param: string) {
    super(
      `Custom error message: ${param}`,
      400,  // HTTP status code
      "MY_CUSTOM_ERROR"  // Error code
    );
  }
}
```

## 🎓 Related Patterns

- **SOLID Principles**: SRP - Error handling có responsibility riêng
- **Clean Architecture**: Domain exceptions không depend vào infrastructure
- **Middleware Pattern**: Centralized error handling
- **Exception Hierarchy**: Tất cả extend từ `BaseException`
