import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ type: 'varchar' })
    firstName!: string

  @Column({ type: 'varchar' })
    lastName!: string
}
