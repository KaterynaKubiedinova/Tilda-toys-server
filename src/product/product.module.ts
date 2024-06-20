import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImageUploaderModule } from 'src/image-uploader/image-uploader.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ImageUploaderModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
