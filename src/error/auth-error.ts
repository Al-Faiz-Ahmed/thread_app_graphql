// errors/auth-error.ts
import { AppError } from "./app-error";

const AUTH_ERROR_DEFINITIONS = {
  UNAUTHENTICATED: {
    message: "Unauthorized",
    heading: "UNAUTHENTICATED",
    status: 401,
  },
  FORBIDDEN: {
    message: "Forbidden",
    heading: "FORBIDDEN",
    status: 403,
  },
} as const;

export type AuthErrorType = keyof typeof AUTH_ERROR_DEFINITIONS;

export class AuthError extends AppError {

  constructor(type: AuthErrorType = "UNAUTHENTICATED") {

    const config = AUTH_ERROR_DEFINITIONS[type];
    
    super(config.message, config.heading, config.status);
    this.name = "AuthError";
  }
}
