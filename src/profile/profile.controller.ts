import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/UpdateProfileDto.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('one')
  findOne(@Req() request:Request) {
    return this.profileService.findOne(request);
  }


  @Patch()
  @UseInterceptors(FileFieldsInterceptor([
    {name:'avatar'},
    {name:'images'}
  ]))
  update(@Req() request:Request, @Body() updateProfileDto: UpdateProfileDto,@UploadedFiles() files:{avatar?:Express.Multer.File,images?:Express.Multer.File[]}) {

    // return this.profileService.update(request, updateProfileDto,files);
  }

  // @Delete()
  // remove(@Req() request:Request) {
  //   return this.profileService.(request);
  // }
  
}
