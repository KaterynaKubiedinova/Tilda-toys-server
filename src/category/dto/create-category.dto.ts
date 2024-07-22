import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'New category title',
    default: 'toys',
  })
  title: string;
}
