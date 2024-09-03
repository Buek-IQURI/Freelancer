import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      include: {},
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
