import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/middleware/cloudinary/cloudinary.service';


@Module({
  imports: [ConfigModule, UserModule, PrismaModule,], 
  controllers: [ProfileController],
  providers: [ProfileService,PrismaService,JwtService,CloudinaryService,]
})
export class ProfileModule {}
