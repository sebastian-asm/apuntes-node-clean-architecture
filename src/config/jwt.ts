import { sign, SignOptions, verify } from 'jsonwebtoken'

import { envs } from './envs'

const SECRET_SEED = envs.SECRET_SEED

export class JwtAdapter {
  static generateToken = (payload: Object, expiresIn: SignOptions['expiresIn'] = '2h'): Promise<string | null> => {
    return new Promise((resolve) => {
      sign(payload, SECRET_SEED, { expiresIn }, (error, token) => {
        if (error) return resolve(null)
        resolve(token!)
      })
    })
  }

  static verifyToken = <T>(token: string): Promise<T | null> => {
    return new Promise((resolve) => {
      verify(token, SECRET_SEED, (error, decoded) => {
        if (error) return resolve(null)
        resolve(decoded as T)
      })
    })
  }
}
