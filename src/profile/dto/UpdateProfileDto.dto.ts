
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    FreeLance = 'freelance'
    // add other roles as needed
  }


export class UpdateProfileDto {

    @IsOptional()
    avatar?: string

    @IsString()
    readonly firstName:string

    @IsOptional()
    @IsString()
    readonly lastName:string

    @IsOptional()
    @IsString()
    age:string

    @IsEnum(UserRole)
    roles:UserRole
    
    @IsOptional()
    @IsString()
    readonly address:string

    @IsOptional()
    @IsString()
    readonly images:string
    
}
