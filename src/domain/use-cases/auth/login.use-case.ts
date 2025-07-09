import { SignOptions } from 'jsonwebtoken'

import { LoginDto } from '../../dtos/auth/login.dto'
import { UserEntity } from '../../entities/user.entity'
import { AuthRepository } from '../../repositories/auth.repository'
import { JwtAdapter } from '../../../config/jwt'
import { CustomError } from '../../errors/custom.error'

interface ILoginUseCase {
  execute(loginDto: LoginDto): Promise<IResponse>
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

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginDto: LoginDto): Promise<IResponse> {
    const user = await this.authRepository.login(loginDto)
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
