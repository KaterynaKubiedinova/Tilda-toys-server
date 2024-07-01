import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  imageId: string;

  imageUrl: string;

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  price: string;
}
