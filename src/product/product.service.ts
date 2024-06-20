import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ImageUploaderService } from 'src/image-uploader/image-uploader.service';
import crypto from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageUploaderService: ImageUploaderService,
  ) {}

  async create(dto: CreateProductDto) {
    const existProduct = await this.productRepository.findOne({
      where: {
        title: dto.title,
      },
    });

    if (existProduct)
      throw new BadRequestException('This product already exsist');
    const randomImageName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString('hex');
    const imageName = randomImageName();
    await this.imageUploaderService.create(dto.image, imageName);
    const product = await this.productRepository.save({
      title: dto.title,
      description: dto.description,
      category: { id: +dto.category_id },
      price: dto.price,
      image: { id: imageName, url: '' },
    });
    return { product };
  }

  async findAll() {
    const allProducts = await this.productRepository.find({
      select: {
        id: true,
        image: {
          id: true,
          url: true,
        },
        price: true,
        title: true,
      },
    });

    for (const product of allProducts) {
      this.imageUploaderService
        .findOne(product.image.id)
        .then((data) => (product.image.url = data.url));
    }

    return allProducts;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException('This product is not in database');

    return { product };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException('This product is not in database');

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('This product already deleted');

    return await this.productRepository.remove(product);
  }
}
