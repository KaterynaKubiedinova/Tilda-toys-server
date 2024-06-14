import { Category } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;
}
