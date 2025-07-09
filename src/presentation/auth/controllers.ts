import { Request, Response } from 'express'

import { RegisterDto } from '../../domain/dtos/auth/register.dto'
import { AuthRepository } from '../../domain/repositories/auth.repository'
import { CustomError } from '../../domain/errors/custom.error'
import { UserModel } from '../../data/mongodb/models/user.model'

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })
    return res.status(500).json({ message: 'Internal Server Error', error })
  }

  login = (req: Request, res: Response) => {
    res.json(req.body)
  }

  register = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body)
    if (error) {
      res.status(400).json({ error })
      return
    }
    this.authRepository
      .register(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res))
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find().then((users) => res.json(users))
  }
}
