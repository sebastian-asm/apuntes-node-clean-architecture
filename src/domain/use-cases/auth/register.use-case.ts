import { SignOptions } from 'jsonwebtoken'

import { JwtAdapter } from '../../../config/jwt'
import { RegisterDto } from '../../dtos/auth/register.dto'
import { AuthRepository } from '../../repositories/auth.repository'
import { CustomError } from '../../errors/custom.error'

interface IRegisterUseCase {
  execute(registerDto: RegisterDto): Promise<IResponse>
}

interface IResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

type SignToken = (payload: Object, expiresIn?: SignOptions['expiresIn']) => Promise<string | null>

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerDto: RegisterDto): Promise<IResponse> {
    const user = await this.authRepository.register(registerDto)
    const token = await this.signToken({ id: user.id }, '2h')
    if (!token) throw CustomError.internalServerError('Error generating token')
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
