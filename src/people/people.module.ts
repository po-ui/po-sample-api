import { Module } from '@nestjs/common';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';
import { BeforeRemoveController } from './before-remove/before-remove.controller';
import { BeforeRemoveService } from './before-remove/before-remove.service';
@Module({
  controllers: [MetadataController, PeopleController, BeforeRemoveController],
  providers: [PeopleService, MetadataService, BeforeRemoveService]
})
export class PeopleModule {}
