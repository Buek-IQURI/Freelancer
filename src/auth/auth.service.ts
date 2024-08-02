import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/user/dto/register.dto';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string , password: string) {
    const user = await this.userService.findByEmail(email);

    if(user && (await bcrypt.compare(password, user.password))) {
      const result = user
      return {
        email: result.email,
        userId: result.id
      }
    }

    return null;

  }

  async register(registerDto: RegisterDto) {
    
  }



  async login(user: any){
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
