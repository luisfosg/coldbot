import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity({ name: 'user_server' })
export class UserServer {
  @PrimaryColumn('uuid')
    id: string = uuid()

  @Column({ type: 'int' })
    user_id!: number

  @Column({ type: 'int' })
    server_id!: number
}
