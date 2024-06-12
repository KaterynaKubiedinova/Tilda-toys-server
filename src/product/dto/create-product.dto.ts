import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: object;

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  price: string;
}
