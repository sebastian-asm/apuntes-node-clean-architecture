import { BcryptAdapter } from '../../config/bcrypt'
import { UserModel } from '../../data/mongodb/models/user.model'
import { AuthDatasource } from '../../domain/datasources/auth.datasource'
import { LoginDto } from '../../domain/dtos/auth/login.dto'
import { RegisterDto } from '../../domain/dtos/auth/register.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { CustomError } from '../../domain/errors/custom.error'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashedPassword: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto
    try {
      const existsUser = await UserModel.findOne({ email })
      if (existsUser) throw CustomError.badRequest('Email already exists')
      const user = new UserModel({ name, email, password: this.hashPassword(password) })
      await user.save()
      return UserMapper.toEntity(user)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) throw error
      throw CustomError.internalServerError()
    }
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto
    try {
      const user = await UserModel.findOne({ email })
      if (!user) throw CustomError.badRequest('Email or password is incorrect')
      const isPasswordValid = this.comparePassword(password, user.password)
      if (!isPasswordValid) throw CustomError.badRequest('Email or password is incorrect')
      return UserMapper.toEntity(user)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) throw error
      throw CustomError.internalServerError()
    }
  }
}
