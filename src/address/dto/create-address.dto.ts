import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Address title',
    default: 'Home',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'City',
    default: 'Krakow',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Street',
    default: 'Aleja Pokoju',
  })
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'Building number',
    default: '24',
  })
  @IsNotEmpty()
  building_number: string;

  @ApiProperty({
    description: 'Apartment number',
    default: '10',
  })
  @IsNotEmpty()
  apartment: string;

  @ApiProperty({
    description: 'Phone number',
    default: '+48346926936',
  })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Postal code',
    default: '30-645',
  })
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty({
    description: 'User ID',
    default: '5',
  })
  @IsNotEmpty()
  user_id: string;
}
