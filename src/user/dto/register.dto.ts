

export class ImageDto {

    url: string;

    fileName: string;
  
    mimeType: string;
  
    // path: string;
  }

export class RegisterDto {
  readonly email: string;
  readonly userId: string;
  readonly username: string;
  readonly password: string;
  readonly roles: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar: string;
  readonly address: string;
  readonly age: string;
  images: ImageDto;

//   readonly images:Express.Multer.File;

}
