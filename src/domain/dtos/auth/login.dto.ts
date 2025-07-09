import { Validators } from '../../../config/validators'

export class LoginDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object
    if (!email || !password) return ['All fields are required']
    if (!Validators.email.test(email)) return ['Invalid email format']
    return [undefined, new LoginDto(email, password)]
  }
}
