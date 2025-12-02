export abstract class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errorCode?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationException extends BaseException {
  constructor(message: string = "Validation failed") {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class EmailAlreadyExistsException extends BaseException {
  constructor(email: string) {
    super(`Email ${email} already exists`, 409, "EMAIL_ALREADY_EXISTS");
  }
}

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }
}

export class UserNotFoundException extends BaseException {
  constructor(identifier: string) {
    super(`User not found: ${identifier}`, 404, "USER_NOT_FOUND");
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ConflictException extends BaseException {
  constructor(message: string = "Conflict occurred") {
    super(message, 409, "CONFLICT");
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class DatabaseException extends BaseException {
  constructor(message: string = "Database error") {
    super(message, 500, "DATABASE_ERROR");
  }
}

export class ExternalServiceException extends BaseException {
  constructor(service: string, message?: string) {
    super(message || `${service} service error`, 503, "EXTERNAL_SERVICE_ERROR");
  }
}

export class InternalServerException extends BaseException {
  constructor(message: string = "Internal server error") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}
