import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(registerDto: RegisterDto) {
    const hash = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: hash,
      },
    });

    return new ResponseUserDto(newUser);
  }

  async findByEmail(email: string) {
    const findEmail = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findEmail) {
      throw new Error('Email not found');
    }

    return findEmail
  }
}
