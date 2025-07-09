import { connect } from 'mongoose'

interface Options {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options
    try {
      await connect(mongoUrl, { dbName })
      console.log('💾 Connected to MongoDB')
    } catch (error) {
      throw new Error(`Failed to connect to MongoDB: ${error}`)
    }
  }
}
