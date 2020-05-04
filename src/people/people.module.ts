import { Module } from '@nestjs/common';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';
import { BeforeNewController } from './before-new/before-new.controller';
import { BeforeNewService } from './before-new/before-new.service';
@Module({
  controllers: [MetadataController, PeopleController, BeforeNewController],
  providers: [PeopleService, MetadataService, BeforeNewService]
})
export class PeopleModule {}
