import { DataSource } from 'typeorm'
import { entities } from '#/entity'

import { ENV as env } from '#/constants'

let config

if (env.typeDB === 'postgres') {
  config = {
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASS
  }
} else {
  config = {
    database: env.DB_NAME
  }
}

export const db = new DataSource({
  type: env.typeDB === 'postgres' ? 'postgres' : 'sqlite',
  logging: false,
  synchronize: true,
  entities: [...entities],
  subscribers: [],
  migrations: [],
  ...config
})
