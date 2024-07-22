import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) res) {
    return await this.authService.login(req.user, res)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user
  }

  @Post('registration')
  async registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res,
  ) {
    return await this.authService.registration(dto, res)
  }

  @Get('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Request() req, @Res({ passthrough: true }) res) {
    return this.authService.refreshToken(req.user, res)
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res) {
    await res.clearCookie('refreshToken')
    return res.send({ message: 'Logged out successfully' })
  }
}
