# SOLID Principles Implementation

Dự án này áp dụng đầy đủ **SOLID Principles** trong Clean Architecture.

## 🎯 SOLID Principles

### 1️⃣ **S - Single Responsibility Principle (SRP)**

> "Một class chỉ nên có một lý do để thay đổi"

#### ✅ Ví dụ trong dự án:

**❌ Vi phạm SRP:**
```typescript
// Use Case vừa validate vừa xử lý business logic
class RegisterUseCase {
  execute(input) {
    // Validation
    if (!input.email) throw new Error("Email required");
    if (input.password.length < 6) throw new Error("Password too short");

    // Business logic
    // ...
  }
}
```

**✅ Tuân thủ SRP:**
```typescript
// Tách validation ra service riêng
class UserValidator {
  validateEmail(email: string): void { ... }
  validatePassword(password: string): void { ... }
}

// Use Case chỉ orchestrate
class RegisterUseCase {
  constructor(private validator: UserValidator) {}

  execute(input) {
    this.validator.validateUserRegistration(input.email, input.password);
    // Business logic...
  }
}
```

**📁 Files:**
- `src/domain/services/UserValidator.ts` - Chỉ làm validation
- `src/application/use-cases/RegisterUseCase.ts` - Chỉ orchestrate business logic
- `src/infrastructure/http/controllers/AuthController.ts` - Chỉ handle HTTP

---

### 2️⃣ **O - Open/Closed Principle (OCP)**

> "Open for extension, closed for modification"

#### ✅ Ví dụ trong dự án:

**Mở rộng behavior không cần sửa code gốc:**

```typescript
// Base implementation
class RegisterUseCase implements RegisterUserUseCasePort {
  execute(input) { ... }
}

// Extend with email verification - KHÔNG sửa RegisterUseCase
class RegisterWithEmailVerificationUseCase implements RegisterUserUseCasePort {
  execute(input) {
    // Extend behavior
    await this.sendVerificationEmail();
  }
}
```

**📁 Files:**
- `src/application/ports/in/RegisterUserUseCasePort.ts` - Interface cho extensions
- `src/application/use-cases/*.ts` - Các implementations khác nhau

---

### 3️⃣ **L - Liskov Substitution Principle (LSP)**

> "Subclass phải có thể thay thế parent class mà không làm hỏng hệ thống"

#### ✅ Ví dụ trong dự án:

```typescript
// Controller chấp nhận bất kỳ implementation nào của RegisterUserUseCasePort
class AuthController {
  constructor(private registerUseCase: RegisterUserUseCasePort) {}

  async register(req, res) {
    // Có thể là RegisterUseCase hoặc RegisterWithEmailVerificationUseCase
    // Behavior vẫn đúng!
    await this.registerUseCase.execute(dto);
  }
}
```

**📁 Files:**
- Mọi class implement `*Port` interfaces đều tuân thủ LSP

---

### 4️⃣ **I - Interface Segregation Principle (ISP)**

> "Client không nên phụ thuộc vào methods họ không dùng"

#### ✅ Ví dụ trong dự án:

**❌ Vi phạm ISP:**
```typescript
// Interface quá lớn
interface UserRepositoryPort {
  create(user): Promise<User>;
  update(id, user): Promise<User>;
  delete(id): Promise<void>;
  findById(id): Promise<User>;
  findByEmail(email): Promise<User>;
  findAll(): Promise<User[]>;
  // ... 10 methods khác
}

// RegisterUseCase chỉ dùng create và findByEmail
// nhưng phải depend vào toàn bộ interface!
```

**✅ Tuân thủ ISP:**
```typescript
// Tách thành interfaces nhỏ
interface UserReaderPort {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

interface UserWriterPort {
  create(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

// Use case chỉ depend vào methods cần thiết
class RegisterUseCase {
  constructor(
    private userReader: UserReaderPort,  // Chỉ cần read
    private userWriter: UserWriterPort   // Chỉ cần write
  ) {}
}
```

**📁 Files:**
- `src/application/ports/out/UserRepositoryPort.ts` - Tách thành UserReaderPort + UserWriterPort

---

### 5️⃣ **D - Dependency Inversion Principle (DIP)**

> "Depend on abstractions, not concretions"

#### ✅ Ví dụ trong dự án:

**❌ Vi phạm DIP:**
```typescript
// Controller phụ thuộc vào concrete class
import { RegisterUseCase } from "...";

class AuthController {
  constructor(private registerUseCase: RegisterUseCase) {}
  // Tight coupling với RegisterUseCase!
}
```

**✅ Tuân thủ DIP:**
```typescript
// Controller phụ thuộc vào abstraction (interface)
import { RegisterUserUseCasePort } from "...";

class AuthController {
  constructor(private registerUseCase: RegisterUserUseCasePort) {}
  // Loose coupling - có thể swap implementation bất kỳ!
}
```

**Dependency Flow:**
```
┌─────────────────────────────────────┐
│   Infrastructure Layer              │
│   (AuthController)                  │
│         ↓ depends on                │
│   ┌─────────────────────────────┐   │
│   │  Application Layer          │   │
│   │  (RegisterUserUseCasePort)  │   │  ← Interface (Abstraction)
│   │         ↑ implements        │   │
│   │  RegisterUseCase            │   │  ← Concrete Implementation
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**📁 Files:**
- `src/application/ports/in/*.ts` - Input ports (abstractions)
- `src/application/ports/out/*.ts` - Output ports (abstractions)
- `src/infrastructure/**/*.ts` - Depend on abstractions, not concrete classes

---

## 📊 Summary Table

| Principle | Before | After | Benefit |
|-----------|--------|-------|---------|
| **SRP** | Use case có validation | Tách ra `UserValidator` | Dễ test, dễ maintain |
| **OCP** | Sửa code để thêm feature | Extend interface | Không phá code cũ |
| **LSP** | Tight coupling với class | Dùng interface | Swap implementation dễ dàng |
| **ISP** | Interface lớn | Tách interfaces nhỏ | Client chỉ depend cần thiết |
| **DIP** | Depend concrete class | Depend interface | Loose coupling, dễ test |

---

## 🧪 Testing Benefits

SOLID makes testing easier:

```typescript
// ✅ Easy to mock with DIP
const mockRegisterUseCase: RegisterUserUseCasePort = {
  execute: jest.fn().mockResolvedValue({ id: "123", email: "test@test.com" })
};

const controller = new AuthController(mockRegisterUseCase, mockLoginUseCase);

// ✅ Easy to test validator separately (SRP)
const validator = new UserValidator();
expect(() => validator.validateEmail("invalid")).toThrow();

// ✅ Easy to swap implementations (OCP + LSP)
const prodUseCase = new RegisterUseCase(...);
const testUseCase = new MockRegisterUseCase(...);
// Both work the same!
```

---

## 🎯 Real-World Examples

### Scenario 1: Add Email Verification

**Without SOLID:** Phải sửa `RegisterUseCase` → Risk breaking existing code

**With SOLID:** Tạo `RegisterWithEmailVerificationUseCase` implements `RegisterUserUseCasePort` → Không ảnh hưởng code cũ

### Scenario 2: Switch from MongoDB to PostgreSQL

**Without SOLID:** Phải sửa tất cả Use Cases

**With SOLID:** Chỉ cần tạo `PostgresUserRepository` implements `UserRepositoryPort` → Swap trong DI container

### Scenario 3: Add Password Strength Validation

**Without SOLID:** Sửa logic trong `RegisterUseCase`

**With SOLID:** Thêm method trong `UserValidator` → Use case không thay đổi

---

## 📝 Checklist

Khi thêm feature mới, check:

- [ ] **SRP**: Class chỉ làm 1 việc?
- [ ] **OCP**: Có thể extend mà không sửa code cũ?
- [ ] **LSP**: Implementation có thể thay thế interface?
- [ ] **ISP**: Interface có quá lớn không?
- [ ] **DIP**: Có depend vào concrete class không?

---

## 🔗 References

- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
