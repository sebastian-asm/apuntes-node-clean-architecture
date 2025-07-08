import { AuthDatasource } from '../../domain/datasources/auth.datasource'
import { RegisterDto } from '../../domain/dtos/auth/register.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { CustomError } from '../../domain/errors/custom.error'

export class AuthDatasourceImpl implements AuthDatasource {
  register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto
    try {
      return Promise.resolve(new UserEntity('1', name, email, password, ['ADMIN']))
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServerError()
    }
  }
}
