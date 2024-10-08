import { ApiProperty } from '@nestjs/swagger';
import { User } from "@prisma/client";

 
export class ResponseUserDto {
    @ApiProperty({
        description: 'The id of the user',
        example: 'aa525a522a5252a534esf',
    })
    id: string;

    @ApiProperty({
        description: 'The username of the user',
        example: 'Jason smit',
    })
    username: string;

    @ApiProperty({
        description: 'The email of the user'
    })
    email:string

    @ApiProperty({
        description: 'The password of the user',
        example: '2@H2398RH329F232F32H9FOJE4ST8JSGJQ8J8j498gjf032jf032f03f',
    })
    password: string;

    @ApiProperty({
        description: 'The google id of the user',
        example: '2@H2398RH329F232F32H9FOJf',
    })
    googleId: string;

    @ApiProperty({
        description: 'The role of the user',
        example: 'user',
    })
    roles: string;

    @ApiProperty()
    isVerified: boolean;

    @ApiProperty({
        description: 'The date when the user was created',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The date when the user was updated',
    })
    updatedAt: Date;
    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
}
