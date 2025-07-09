import { Router } from 'express'

import { AuthController } from './controllers'
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repositoy.impl'
import { AuthDatasourceImpl } from '../../infrastructure/datasources/auth.datasource.impl'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()
    const datasource = new AuthDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)
    const authController = new AuthController(authRepository)

    router.post('/login', authController.login.bind(authController))
    router.post('/register', authController.register)
    router.get('/users', [AuthMiddleware.validateJwt], authController.getUsers)

    return router
  }
}
