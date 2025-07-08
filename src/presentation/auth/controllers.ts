import { Request, Response } from 'express'

import { RegisterDto } from '../../domain/dtos/auth/register.dto'
import { AuthRepository } from '../../domain/repositories/auth.repository'

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

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
      .catch((error) => res.status(500).json(error))
  }
}
