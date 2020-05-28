import { Module } from '@nestjs/common';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';
import { BeforeNewController } from './before-new/before-new.controller';
import { BeforeNewService } from './before-new/before-new.service';
import { BeforeEditController } from './before-edit/before-edit.controller';
import { BeforeEditService } from './before-edit/before-edit.service';

@Module({
  controllers: [MetadataController, PeopleController, BeforeNewController, BeforeEditController],
  providers: [PeopleService, MetadataService, BeforeNewService, BeforeEditService]
})
export class PeopleModule {}
