import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LogInDto {

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    email?: string;


    @IsNotEmpty()
    @IsString()
    password: string
}
