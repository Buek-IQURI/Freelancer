import { Controller, Get, Post, Body, Request, Param, Delete, UseGuards, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { PasswordDto } from 'src/user/dto/password.dto';
import { LogInDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  async login(@Body() loginDto: LogInDto, @UploadedFile() file){
    return this.authService.login(loginDto);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar',{}))
  async register(@Body() registerDto: RegisterDto, @UploadedFile() file) {
    return this.authService.register(registerDto, file);
  }

  @Post('refresh')
  async refresh(@Body() refreshToken:any){
    return this.authService.refreshAccessToken(refreshToken)
  }


  @UseGuards(JwtAuthGuard)
  @Post('change')
  async changePass(@Req() req: Request, @Body() passwordDto: PasswordDto) {
    const change = await this.authService.ChangePassword(req, passwordDto);
    return change;
  }


}
