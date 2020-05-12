import { Injectable } from '@nestjs/common';

import { beforeRemove } from './db/beforeRemove.data';

@Injectable()
export class BeforeRemoveService {
  getBeforeRemove(data) {
    return beforeRemove;
  }
}
