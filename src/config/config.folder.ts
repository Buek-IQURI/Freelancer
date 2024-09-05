import { promises } from 'fs';

export async function Folder() {
  promises
    .mkdir('../Images/', { recursive: true })
    .catch((error) => console.log(error));
}

