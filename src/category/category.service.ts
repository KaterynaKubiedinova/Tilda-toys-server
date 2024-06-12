import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const existCategory = await this.categoryRepository.findOne({
      where: {
        title: dto.title,
      },
    });
    if (existCategory)
      throw new BadRequestException('This category already exsist');
    const category = await this.categoryRepository.save({ title: dto.title });
    return { category };
  }

  async findAll() {
    const allCategories = await this.categoryRepository.find();
    return allCategories;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    return await this.categoryRepository.remove(category);
  }
}
