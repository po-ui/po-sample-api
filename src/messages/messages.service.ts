import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class MessagesService {

  errorStatus = '401';

  getMessages(status: string, message: object) {

    if (status === this.errorStatus) {
      throw new HttpException(message, Number(status));
    }

    return message;
  }
}
