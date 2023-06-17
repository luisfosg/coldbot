import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

import { User } from '#/entity/user.entity'

@Entity({ name: 'server' })
export class Server {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ type: 'varchar' })
    server_id!: string

  @Column({ type: 'varchar' })
    prefix!: string

  @Column({ type: 'boolean', default: true })
    active!: boolean

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date

  @ManyToMany(() => User, (user) => user.servers)
  @JoinTable({
    name: 'user_server',
    joinColumn: {
      name: 'server_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
    users!: User[]
}
