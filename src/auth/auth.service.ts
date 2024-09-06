import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ImageDto, RegisterDto } from 'src/user/dto/register.dto';

import { LogInDto } from 'src/user/dto/login.dto';

import { ConfigService } from '@nestjs/config';
import { PasswordDto } from 'src/user/dto/password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/middleware/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService
  ) {}


  //NOTE - Register
  async register(registerDto: RegisterDto, file: any) {
    const {
      username,
      firstName,
      email,
      address,
      password,
      roles,
      age,
      lastName,
    } = registerDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const findEmail = await this.prisma.user.findFirst({
      where: { AND: [{ email, username }] },
    });

    if (file && findEmail) {
      throw new BadRequestException('Email Or User Name Ready exist');
    }

    let imageData
    let avatar: ImageDto

    if (file) {
      imageData = file ? await this.cloudinaryService.uploadImage(file) : null;
      
      
      avatar = {
        url: imageData.url,
        fileName: imageData.display_name,
        mimeType: imageData.format
      }
    }

    

    const defaultImage: ImageDto = {
      url:'default.png',
      fileName:'default_file_name',
      mimeType:'png',
    }


    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    const profile = await this.prisma.profile.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
        avatar: avatar || defaultImage,
        images: [defaultImage],
        age,
        roles,
        address,
        email,
      },
    });

    return [{ user, profile }];
  }

  //NOTE - Login
  async login(loginDto: LogInDto) {
    const { username, password, email } = loginDto;
    let data: any;

    data = await this.prisma.user.findFirst({
      where:{ 
        OR: [
          { username }, 
          { email }
        ]
      }
    });
    // if(!data){  data = await this.userModel.findOne({ email });}

    if (!data) {
      console.error('Invalid user:', data);
      throw new BadRequestException('Invalid user');
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch === false) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: data.email,
      sub: data.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.EXPIRES,
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { access_token, refresh_token };
  }

  //NOTE - Refresh Token
  async refreshAccessToken(refreshToken: any) {
    const refresh = refreshToken.payload;

    const payload = this.jwtService.verify(refresh, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    const newAccessToken = await this.jwtService.signAsync({
      email: payload.email,
      sub: payload.sub,
    });

    const newRefreshToken = await this.jwtService.signAsync(
      { email: payload.email, sub: payload.sub },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '1d',
      },
    );

    return {
      newAccessToken,
      newRefreshToken,
    };
  }


  async ChangePassword(request:any, passwordDto: PasswordDto){
    const {sub} = request.user;

    
    const passChange = await this.prisma.user.findFirst({where:{id: sub}});

    if(!passChange) {
      console.error('Invalid user:', passChange);
      throw new BadRequestException('Invalid user');
    }

    const comparePass = await bcrypt.compare(
      passwordDto.oldPassword,
      passChange.password,
    )

    if(!comparePass) {
      throw new BadRequestException('Fail Change Password')
    }


    const password = await bcrypt.hash(passwordDto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: sub },
      data: {password}
    })

    throw new HttpException('Change Success', HttpStatus.ACCEPTED)
  }







}


