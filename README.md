# Crowdfunding Backend

Backend cho nền tảng Crowdfunding với Blockchain, xây dựng theo Clean Architecture.

## 🏗️ Architecture

Dự án sử dụng **Clean Architecture** với **Hexagonal Pattern (Ports & Adapters)**:

```
src/
├── domain/          → Core Business Logic (Entities)
├── application/     → Use Cases & Ports (Interfaces)
└── infrastructure/  → Technical Details (DB, HTTP, Services)
```

Xem chi tiết tại [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Quick Start

### 1. Prerequisites

- Node.js >= 18
- MongoDB >= 6.0
- npm hoặc yarn

### 2. Installation

```bash
# Clone repository
git clone <repo-url>
cd crowdfunding-be

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Start MongoDB

**Option 1: Homebrew (macOS)**

```bash
brew services start mongodb-community
```

**Option 2: Docker**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 3: Linux systemd**

```bash
sudo systemctl start mongod
```

### 4. Run the server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

Server sẽ chạy tại: `http://localhost:4000`

## 📝 API Endpoints

| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| GET    | `/health`                 | Health check                    |
| POST   | `/api/auth/register`      | Register new user               |
| POST   | `/api/auth/login`         | Login user                      |
| POST   | `/api/campaigns/metadata` | Create campaign metadata (IPFS) |

Xem chi tiết tại [API_TESTING.md](./API_TESTING.md)

## 🧪 Testing

### Test Register API

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Test Login API

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 🔧 Configuration

Tạo file `.env` với các biến sau:

```env
# Server
PORT=4000

# Database
MONGO_URL=mongodb://localhost:27017/crowdfunding

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Web3 Storage (IPFS)
WEB3_STORAGE_TOKEN=your-token-here
```

## 📦 Dependencies

### Main Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `web3.storage` - IPFS storage
- `dotenv` - Environment variables
- `cors` - CORS middleware

### Dev Dependencies

- `typescript` - TypeScript compiler
- `@types/*` - Type definitions
- `tsx` - TypeScript execution for development

## 🏛️ Project Structure

```
src/
├── domain/
│   ├── entities/              # Domain entities
│   │   ├── User.ts
│   │   └── CampaignMetadata.ts
│   └── value-objects/         # Value objects
│
├── application/
│   ├── use-cases/             # Business logic use cases
│   │   ├── RegisterUseCase.ts
│   │   ├── LoginUseCase.ts
│   │   └── CreateCampaignMetadataUseCase.ts
│   ├── dto/                   # Data Transfer Objects
│   │   ├── RegisterUserDto.ts
│   │   ├── LoginUserDto.ts
│   │   └── CreateCampaignMetadataDto.ts
│   └── ports/
│       └── out/               # Output ports (interfaces)
│           ├── UserRepositoryPort.ts
│           ├── PasswordHasherPort.ts
│           ├── JWTServicePort.ts
│           └── CampaignMetadataStorageServicePort.ts
│
├── infrastructure/
│   ├── config/
│   │   └── env.ts             # Environment configuration
│   ├── http/
│   │   ├── controllers/       # HTTP controllers
│   │   ├── routes/            # Route definitions
│   │   ├── middlewares/       # Middlewares
│   │   └── server.ts          # Express server setup
│   ├── persistence/
│   │   ├── models/            # Mongoose models
│   │   ├── repositories/      # Repository implementations
│   │   └── orm/               # Database connection
│   └── services/              # External services
│       ├── BcryptPasswordHasher.ts
│       ├── JWTService.ts
│       └── Web3StorageCampaignMetadataService.ts
│
└── main.ts                    # Application entry point
```

## 🎯 Features

- ✅ User Registration & Authentication
- ✅ JWT Token-based Auth
- ✅ Campaign Metadata Storage (IPFS via Web3.Storage)
- ✅ Clean Architecture (Testable & Maintainable)
- ✅ Type Safety with TypeScript
- ✅ MongoDB Integration
- ⏳ Smart Contract Integration (Coming soon)
- ⏳ Payment Processing (Coming soon)

## 🧪 Development

### Build

```bash
npm run build
```

Output sẽ ở folder `dist/`

### Development with auto-reload

```bash
npm run dev
```

### Lint & Format

```bash
# Add these scripts to package.json if needed
npm run lint
npm run format
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Clean Architecture by Uncle Bob
- Hexagonal Architecture by Alistair Cockburn
- TypeScript community
