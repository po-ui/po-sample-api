import { Injectable } from '@nestjs/common';

import { beforeEdit } from './db/beforeedit.data';

@Injectable()
export class BeforeEditService {
  getBeforeEdit() {
    return beforeEdit;
  }
}
