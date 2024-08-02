import { Controller, Get, Post, Body, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const response = await this.userService.create(registerDto);

    return response
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req){
    console.log(req.user);
    
    const result  = await this.userService.findByEmail(req.user.email)
    return result
  }
}
