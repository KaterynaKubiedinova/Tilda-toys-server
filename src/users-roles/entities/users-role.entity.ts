// import { User } from 'src/user/entities/user.entity'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class UsersRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  roleID: string

  // @OneToOne(() => User, (user) => user.role)
  // @JoinColumn({ name: 'userId' })
  // user: User
}
