import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
