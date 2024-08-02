import { promises } from 'fs';

export async function Folder() {
  promises
    .mkdir('../images/Tag-Promotion/', { recursive: true })
    .catch((error) => console.log(error));
}

