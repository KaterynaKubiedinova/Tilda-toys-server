import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  building_number: string;

  @Column()
  apartment: string;

  @Column()
  postal_code: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user' })
  user: User;
}
