import { Controller, Get, Post, Body, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(){
    const result = await this.userService.getUsers()
    return result
  }

  @Get(':id')
  async getOne(@Param('id') id: string){
    const result = await this.userService.getUserById(id)
    return result
  }

  @Delete(':id')
  async Delete(@Param('id') id:string){
    const deleteResult = await this.userService.deleteUser(id)
    return deleteResult
  }
}
