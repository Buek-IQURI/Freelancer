import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
  mkdirSync,
} from 'fs';

export const FolderImage = {
  Supplieproduct: 'master_product',
  masterSizeProduct: 'master_size_product',
};
import { SharpService } from 'nestjs-sharp';
import { BUFFER_IMAGES } from 'src/config/config';

//NOTE config sizeImages
const sharpService = new SharpService();
const roundedCorners = Buffer.from(BUFFER_IMAGES);
/**
 *
 * @param file
 * @param folderName
 * @returns
 */
export const CreateUploadFile = async (file: any, folderName: string) => {
  const { originalname, mimetype, path } = file;

  const encodedFileName = Buffer.from(originalname, 'binary').toString('utf-8');

  // const write = createWriteStream(`./src/${folderName}/${originalname}`);
  const write = createWriteStream(`../images/${folderName}/${encodedFileName}`);

  const size = sharpService
    .edit()
    .resize(300, 300)
    .composite([
      {
        input: roundedCorners,
        blend: 'dest-in',
      },
    ])
    .png();

  createReadStream(`./${path}`).pipe(size).pipe(write);

  const imageInfo = {
    url: `${folderName}/${encodedFileName}`,
    fileName: encodedFileName,
    // url: `${folderName}/${originalname}`,
    // fileName: originalname,
    mimeType: mimetype,
    path: `${folderName}/`,
  };

  return imageInfo;
};

export const verifyAndUpload = async (checkId: any, folderName: string) => {
  const dataImage = checkId.image.fileName;

  if (dataImage) {
    if (existsSync(`../images/${folderName}/` + dataImage)) {
      unlinkSync(`../images/${folderName}/` + dataImage);
      // console.log('Delete Success');
    } else {
      console.log('file not found');
    }
  }
};
