import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule  } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryService } from 'src/middleware/cloudinary/cloudinary.service';

@Module({
  imports: [
    // UserModule,
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '3d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    // PrismaService,
    ConfigService,
    // ProfileService,
    CloudinaryService
  ],
})
export class AuthModule {}
