import { get } from 'env-var'

process.loadEnvFile()

export const envs = {
  PORT: get('PORT').required().asPortNumber()
}
