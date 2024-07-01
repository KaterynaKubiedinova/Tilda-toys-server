import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image-uploader')
export class ImageUploaderController {
  constructor(private readonly imageUploaderService: ImageUploaderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageUploaderService.create(file);
  }
}
