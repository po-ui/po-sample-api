import { Injectable } from '@nestjs/common';

import { beforeNew, beforeSave } from './db/beforenew.data';

@Injectable()
export class BeforeNewService {
  getBeforeNew() {
    return beforeNew;
  }

  getBeforeSave() {
    return beforeSave;
  }
}
