import { Injectable, HttpException } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class MessagesService {

  errorStatus = '401';

  getMessages(message: object, query, res) {
    const responseMessage: Message = {
      helpUrl: 'http://po.ui',
      detailedMessage : 'Mensagem técnica e mais detalhada',
      details : [
        {
          code: '000',
          message: 'Literal no idioma da requisição descrevendo o detalhe para o cliente',
          detailedMessage: 'zigurm'
        }
      ]
    };
    if (query.help) {
      responseMessage.helpUrl = query.help || 'http://po.ui';
      delete responseMessage.detailedMessage;
      delete responseMessage.details;
    } else {
     responseMessage.details[0].code = query.code|| '000';
     delete responseMessage.helpUrl;
    }
    
    const resultSuccess = {
      _messages: {
        type: query.type,
        code: query.code || '000',
        message: query.msg || 'mensagem principal',
        ...responseMessage
      }
    }
    const resultError = {
      code: query.code || '000',
      message: query.msg || 'Literal no idioma da requisição descrevendo o erro para o cliente',
      ...responseMessage
    }
    res.writeHead(query.status || 200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(!query.status || (query.status >= 200 && query.status < 400) ? resultSuccess : resultError))
    return message;
  }

  postMessages(status: string, message: object) {

    if (status === this.errorStatus) {
      throw new HttpException(message, Number(status));
    }

    return message;
  }
}
