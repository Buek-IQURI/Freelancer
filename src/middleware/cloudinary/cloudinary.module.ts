import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './couldinary.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes ConfigModule globally available
    }),
  ],
  providers: [CloudinaryService,CloudinaryProvider],
  exports:[CloudinaryService]
})
export class CloudinaryModule {}
