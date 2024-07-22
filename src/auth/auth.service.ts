import { Injectable, Res, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/types/types'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)
    const passwordIsMath = await bcrypt.compare(password, user.password_hash)

    if (user && passwordIsMath) {
      return user
    }
    throw new UnauthorizedException()
  }

  async login(user: User, @Res() res) {
    const { id, email } = user
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    const payload = { email: email, id: id.toString() }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_JWT_SECRET'),
    })

    await res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      expires,
    })

    return {
      id,
      email,
      accessToken,
    }
  }

  async registration(userDto: CreateUserDto, @Res() res) {
    const salt = await bcrypt.genSalt()
    const password_hash = await bcrypt.hash(userDto.password, salt)

    const user = await this.userService.createUser({
      ...userDto,
      password: password_hash,
    })

    return this.login(user, res)
  }

  async refreshToken(user: User, @Res() res) {
    const { id, email } = user
    const payload = { email: email, id: id.toString() }
    const newAccessToken = this.jwtService.sign(payload)
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_JWT_SECRET'),
    })

    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    await res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      expires,
    })
    return {
      accessToken: newAccessToken,
      user,
    }
  }
}
