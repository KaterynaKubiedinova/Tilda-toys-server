import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'New user name',
    default: 'Anatolii',
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'New user surname',
    default: 'Ivanov',
  })
  @IsNotEmpty()
  surname: string

  @ApiProperty({
    description: 'New user email',
    default: 'anatolii.ivanov@gmail.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'New user password',
    default: 'wtcdo%555F',
  })
  @IsNotEmpty()
  password: string

  @IsOptional()
  refresh_token: string
}
