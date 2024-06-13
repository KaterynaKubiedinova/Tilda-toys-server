import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  building_number: string;

  @IsNotEmpty()
  apartment: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  user_id: string;
}
