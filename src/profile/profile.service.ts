import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateProfileDto } from './dto/UpdateProfileDto.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaClient) {}

  async upload(request: any, files: any) {
    const data = request.user;
    const images = [];

    const findId = await this.prisma.profile.findFirst({
      where:{
        OR: [{ userId: data.sub }, {email: data.email}]
      }
    });

    if (!findId){
      console.error('Invalid user:', findId);
      throw new BadRequestException('Invalid Images')
    }

    for (const i of files){
      images.push(i.originalname)
    }

    const picMany = await this.prisma.profile.update({
      where: { id: findId.id },
      data: {
        // images: images
      },
      // {new:true}
    });
    
    return picMany
  }


  async findAll(){
    return await this.prisma.profile.findMany();
  }

  async findOne(request:any){
    const userId = request.user;
    const findProfile = await this.prisma.profile.findFirst({
      where:{
        userId: userId.sub
      }
    })

    return findProfile
  }

  async update(request:any, updateProfileDto: UpdateProfileDto){
    
  }
}
