import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class ImageUploaderService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configServise.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configServise.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configServise.getOrThrow('AWS_S3_BUCKET_REGION'),
  });

  constructor(private readonly configServise: ConfigService) {}

  async create(image: Express.Multer.File, imageName: string) {
    const command = new PutObjectCommand({
      Bucket: this.configServise.get('AWS_S3_BUCKET_NAME'),
      Key: imageName,
      Body: image.buffer,
      ContentType: image.mimetype,
    });

    await this.s3Client.send(command);
    return 'This action adds a new imageUploader';
  }

  async findOne(imageName: string) {
    const command = new GetObjectCommand({
      Bucket: this.configServise.get('AWS_S3_BUCKET_NAME'),
      Key: imageName,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return { url };
  }

  remove(id: number) {
    return `This action removes a #${id} imageUploader`;
  }
}
