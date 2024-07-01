import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';

@Injectable()
export class ImageUploaderService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.getOrThrow('AWS_S3_BUCKET_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async create(imageFile: Express.Multer.File) {
    const randomImageName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString('hex');
    const imageName = randomImageName() + imageFile.originalname;

    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: imageName,
      Body: imageFile.buffer,
      ContentType: imageFile.mimetype,
    });

    await this.s3Client.send(command);

    const getCommand = new GetObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: imageName,
    });

    const url = await getSignedUrl(this.s3Client, getCommand);

    return { id: imageName, url: url };
  }

  async findOne(imageName: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: imageName,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return { url };
  }

  remove(id: number) {
    return `This action removes a #${id} imageUploader`;
  }
}
