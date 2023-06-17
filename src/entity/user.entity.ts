import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

import { Server } from '#/entity/server.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ type: 'varchar', length: 255 })
    name!: string

  @Column({ type: 'varchar', length: 255 })
    username!: string

  @Column({ type: 'varchar', length: 4 })
    discriminator!: string

  @Column({ type: 'varchar', length: 255 })
    avatar!: string

  @Column({ type: 'boolean', default: true })
    active!: boolean

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date

  @ManyToMany(() => Server, (server) => server.users)
  @JoinTable({
    name: 'user_server',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'server_id',
      referencedColumnName: 'id'
    }
  })
    servers!: Server[]
}
