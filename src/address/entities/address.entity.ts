import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  building_number: string;

  @Column()
  apartment: string;

  @Column()
  phone_number: string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user' })
  user: User;
}
