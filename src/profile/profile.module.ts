import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, UserModule, PrismaModule], // Import UserModule สำหรับ UserService
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService], // Register PrismaService ใน providers
})
export class ProfileModule {}
