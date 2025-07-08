import { RegisterDto } from '../../domain/dtos/auth/register.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { AuthRepository } from '../../domain/repositories/auth.repository'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthRepository) {}

  register(registerDto: RegisterDto): Promise<UserEntity> {
    return this.authDatasource.register(registerDto)
  }
}
