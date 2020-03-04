import { Module } from '@nestjs/common';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { MetadataController } from './metadata/metadata.controller';
import { MetadataService } from './metadata/metadata.service';
@Module({
  controllers: [MetadataController, PeopleController],
  providers: [PeopleService, MetadataService]
})
export class PeopleModule {}
