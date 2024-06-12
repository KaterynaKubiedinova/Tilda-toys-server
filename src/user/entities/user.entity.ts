import { Address } from 'src/address/entities/address.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;
}
