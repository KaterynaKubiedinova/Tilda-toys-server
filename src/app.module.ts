/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    AddressModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: 5432,
        password: configService.get('POSTGRES_PASSWORD'),
        username: configService.get('POSTGRES_USER'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
