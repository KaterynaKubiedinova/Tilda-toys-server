import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';

@Module({
  providers: [ImageUploaderService],
  exports: [ImageUploaderService],
})
export class ImageUploaderModule {}
