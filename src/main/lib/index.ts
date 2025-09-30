// aici practic va fi logica aplicatiei
import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os'

export const checkConfig = () => {
  const filePath = path.join(`${homedir()}\\Documents\\Kryptos`, 'config.kryptos');

  if (fs.existsSync(filePath)) {
    console.log('File exists!');
  } else {
    console.log('File does not exist.');

    createFile(filePath);
  }
};

const createFile = async (filePath: string) =>  {
  try {
    const content = 'Hello, world!';
    await fs.writeFile(filePath, content, { encoding: 'utf8', flag: 'w' });
    console.log('File created successfully!');
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      console.log('File already exists.');
    } else {
      console.error('Error creating file:', err);
    }
  }
}

export const checkPassword = (password: string): boolean => {
  checkConfig();
  console.log("suntem in backend si verificam" + password);
  return true;
};
