// import { UsersRole } from 'src/users-roles/entities/users-role.entity'
import { Address } from '../../address/entities/address.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  email: string

  @Column()
  password_hash: string

  @Column()
  refresh_token: string

  @OneToMany(() => Address, (address) => address.user)
  address: Address[]

  // @OneToOne(() => UsersRole, (userRole) => userRole.user)
  // role: UsersRole
}
