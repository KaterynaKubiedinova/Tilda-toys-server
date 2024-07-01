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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const existProduct = await this.productRepository.findOne({
      where: {
        title: dto.title,
      },
    });

    if (existProduct)
      throw new BadRequestException('This product already exsist');

    const product = await this.productRepository.save({
      title: dto.title,
      description: dto.description,
      category: { id: +dto.category_id },
      price: dto.price,
      imageId: dto.imageId,
      imageUrl: dto.imageUrl,
    });
    return { product };
  }

  async findAll() {
    const allProducts = await this.productRepository.find({
      select: {
        id: true,
        imageUrl: true,
        price: true,
        title: true,
      },
    });

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
