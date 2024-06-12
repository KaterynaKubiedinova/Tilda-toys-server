import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) { }
  
  async create(dto: CreateAddressDto) {
    const existUser = await this.addressRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (existUser) throw new BadRequestException('This user already exsist');
  
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(dto.password, salt);
  
    const user = await this.userRepository.save({
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password_hash,
    });
  
    return { user };
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

async findOne(id: number) {
  const user = await this.userRepository.findOne({
    where: {
      id,
    },
  });
  if (!user) throw new NotFoundException('This user is not in database');

  return { user };
}

async update(id: number, updateUserDto: UpdateUserDto) {
  const user = await this.userRepository.findOne({ where: { id } });

  if (!user) throw new NotFoundException('This user is not in database');

  Object.assign(user, updateUserDto);

  return await this.userRepository.save(user);
}

async remove(id: number) {
  const user = await this.userRepository.findOne({ where: { id } });

  if (!user) throw new NotFoundException('This user already deleted');

  return await this.userRepository.remove(user);
}