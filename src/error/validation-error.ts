// errors/validation-error.ts
import { AppError } from './app-error'

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'BAD_USER_INPUT', 400)

    this.name = "ValidationError"
  }
}
