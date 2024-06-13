import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async create(dto: CreateAddressDto) {
    const existUserAddress = await this.addressRepository.findOne({
      where: {
        user: { id: +dto.user_id },
        title: dto.title,
      },
    });
    if (existUserAddress)
      throw new BadRequestException(
        'This user already has address with this title',
      );

    const address = await this.addressRepository.save({
      title: dto.title,
      city: dto.city,
      street: dto.street,
      building_number: dto.building_number,
      apartment: dto.apartment,
      postal_code: dto.postal_code,
      phone_number: dto.phone_number,
      user: { id: +dto.user_id },
    });

    return { address };
  }

  async findAllByUser(userId: number) {
    const addresses = await this.addressRepository.find({
      where: { user: { id: userId } },
      select: {
        title: true,
        street: true,
        building_number: true,
        id: true,
      },
    });

    if (!addresses)
      throw new NotFoundException('This user have not had any addresses yet');

    return addresses;
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOne({
      where: {
        id,
      },
    });

    if (!address)
      throw new NotFoundException('This address is not in database');

    return { address };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address)
      throw new NotFoundException('This address is not in database');

    Object.assign(address, updateAddressDto);

    return await this.addressRepository.save(address);
  }

  async remove(id: number) {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) throw new NotFoundException('This address already deleted');

    return await this.addressRepository.remove(address);
  }
}
