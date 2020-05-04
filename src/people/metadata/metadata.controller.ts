import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';

import { MetadataService } from './metadata.service';
import { GetMetadataDto } from './dto/get-metadata.dto';
import { MetadataType } from './metadata-type.enum';

@ApiTags('people')
@Controller('people/metadata')
export class MetadataController {
  constructor(private metadataService: MetadataService) {}

  @ApiResponse({ status: 200, type: GetMetadataDto })
  @ApiQuery({ name: 'version', required: true })
  @ApiQuery({ name: 'type', required: true, enum: MetadataType })
  @Get()
  getMetadata(@Query() query) {
    const { version, type } = query;
    return this.metadataService.getMetadata(parseInt(version, 10), type);
  }
}
