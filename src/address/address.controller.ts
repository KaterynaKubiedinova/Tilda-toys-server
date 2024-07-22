import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findAllByUser(@Param('id') id: string) {
    return this.addressService.findAllByUser(+id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Query('id') id: string) {
    return this.addressService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id)
  }
}
