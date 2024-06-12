import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
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
  user_id: string;
}
