import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/UpdateProfileDto.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/middleware/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { ImageDto } from 'src/user/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    // private jwtService: JwtService,
    // private configService: ConfigService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async update(request: any, updateProfileDto: UpdateProfileDto, files: any) {
    const data = request.user;
    const images = [];

    

    const { firstName, lastName, address, roles, age } = updateProfileDto;

    const findId = await this.prisma.profile.findFirst({
      where: {
        OR: [{ userId: data.sub }, { email: data.email }],
      },
    });

    if (!findId) {
      console.error('Invalid user:', findId);
      throw new BadRequestException('Invalid user');
    }
    console.log(files.avatar);
    
    console.log(files.avatar.length > 1);
    if (files.avatar.length > 1) {
      return { message: "Avatar file detected" };
    }
    
    let imageAvatar: ImageDto | null = null;

    if (files) {
      if (files.images) {
        for (const i of files.images) {
          const imageData = await this.cloudinaryService.uploadImage(i);
          const imageInfo: ImageDto  = {
            url: imageData.url,
            fileName: imageData.display_name,
            mimeType: imageData.format,
          };
          images.push(imageInfo);
        }
      
      }

      if (files.avatar) {
        for(const avatarFiles of  files.avatar){
          const avatarData  = files.avatar? await this.cloudinaryService.uploadImage(avatarFiles): null;
          imageAvatar = {
            url: avatarData.url,
            fileName: avatarData.display_name,
            mimeType: avatarData.format,
          };
          break;
        }
      }
    }

    const defaultImage: ImageDto = {
      url:'default.png',
      fileName:'default_file_name',
      mimeType:'png',
    }
    
    const updatedProfile  = await this.prisma.profile.update({
      where: { id: findId.id },
      data: {
        firstName,
        lastName,
        address,
        roles,
        age,
        images: images || [defaultImage],
        avatar: imageAvatar || defaultImage,
      },
      // {new:true}
    });

    return updatedProfile
  }

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findOne(request: any) {
    const userId = request.user;
    const findProfile = await this.prisma.profile.findFirst({
      where: {
        userId: userId.sub,
      },
    });

    return findProfile;
  }

  // async update(request:any, updateProfileDto: UpdateProfileDto){

  // }
}
