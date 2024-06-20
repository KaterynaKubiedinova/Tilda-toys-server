import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: Express.Multer.File;

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  price: string;
}
