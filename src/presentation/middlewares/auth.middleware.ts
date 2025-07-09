import { NextFunction, Request, Response } from 'express'

import { JwtAdapter } from '../../config/jwt'
import { UserModel } from '../../data/mongodb/models/user.model'

export class AuthMiddleware {
  static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization')

    if (!authorization) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    if (!authorization.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Invalid token format' })
      return
    }

    try {
      const token = authorization.split(' ')[1] || ''
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token)
      if (!payload) {
        res.status(401).json({ message: 'Invalid token' })
        return
      }

      const user = await UserModel.findById(payload.id)
      if (!user) {
        res.status(400).json({ message: 'User not found' })
        return
      }
      ;(req as any).user = user
      next()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
