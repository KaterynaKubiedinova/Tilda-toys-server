import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({
    description: 'The title for new toy',
    default: 'Tilda doll',
  })
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Description for new toy',
    default: 'This is a beautifull handmade toy',
  })
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'The image ID',
    default:
      'be2186ca8a136ab869b6e22c9b19aa26035ad60e9e25c56bbedd6469807896f2IMG_9457.JPG',
  })
  imageId: string

  @ApiProperty({
    description: 'The image URL',
    default:
      'https://tilda-pictures-backet.s3.eu-central-1.amazonaws.com/be2186ca8a136ab869b6e22c9b19aa26035ad60e9e25c56bbedd6469807896f2IMG_9457.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZCBPGUZN4AQ7FPN%2F20240701%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240701T142644Z&X-Amz-Expires=900&X-Amz-Signature=34d78312e66f218ae588cdaa941fe6724d4f050523b75a38a25ba1bd9926b2ce&X-Amz-SignedHeaders=host&x-id=GetObject',
  })
  imageUrl: string

  @ApiProperty({
    description: 'The category ID for new toy',
    default: '13',
  })
  @IsNotEmpty()
  category_id: string

  @ApiProperty({
    description: 'The price for new toy',
    default: '249',
  })
  @IsNotEmpty()
  price: string
}
