import { Injectable } from '@nestjs/common';

import { beforeNew } from './db/beforenew.data';

@Injectable()
export class BeforeNewService {
  getBeforeNew() {
    return beforeNew;
  }
}
