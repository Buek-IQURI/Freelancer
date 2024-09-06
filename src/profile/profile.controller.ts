import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFiles, UseGuards, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/UpdateProfileDto.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('one')
  findOne(@Req() request:Request) {
    return this.profileService.findOne(request);
  }



  @UseGuards(JwtAuthGuard)
  @Patch('update')
  @UseInterceptors(FileFieldsInterceptor([
    {name:'avatar'},
    {name:'images'}
  ]))
  async update(@Req() request:Request, @Body() updateProfileDto: UpdateProfileDto,@UploadedFiles() files:{avatar?:Express.Multer.File,images?:Express.Multer.File[]}) {
    return await this.profileService.update(request, updateProfileDto,files);
  }

  // @Delete()
  // remove(@Req() request:Request) {
  //   return this.profileService.(request);
  // }
  
}
