import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export default class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer, bucket: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: file,
      }),
    );
  }

  async getFile(key: string, bucket: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });
      return url;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching the file');
    }
  }
}
