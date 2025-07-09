import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  image: { type: String },
  roles: { type: [String], enum: ['USER', 'ADMIN'], default: 'USER' }
})

export const UserModel = model('User', userSchema)
