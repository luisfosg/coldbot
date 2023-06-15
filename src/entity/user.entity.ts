import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ type: 'varchar' })
    firstName!: string

  @Column({ type: 'varchar' })
    lastName!: string
}
