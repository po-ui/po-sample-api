import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { FILE,  BAD_REQUEST as noFileSend } from './file.data';

@Injectable()
export class UploadService {

  file = FILE;

  add(file: any): Promise<any> {
    if (file) {
      return new Promise(resolve => {
        this.file.push(file.originalname);
        resolve([]);
      });
    }

    throw new HttpException(noFileSend, HttpStatus.INTERNAL_SERVER_ERROR);

  }

  findAll(): Promise<any> {
    return new Promise(resolve => {
      resolve({files: this.file});
    });
  }
}
