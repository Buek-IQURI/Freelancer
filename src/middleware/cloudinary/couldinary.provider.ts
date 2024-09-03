import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): void => {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  },
};
