import { Validators } from '../../../config/validators'

export class RegisterDto {
  private constructor(public name: string, public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, RegisterDto?] {
    const { name, email, password } = object
    if (!name || !email || !password) return ['All fields are required']
    if (!Validators.email.test(email)) return ['Invalid email format']
    return [undefined, new RegisterDto(name, email, password)]
  }
}
