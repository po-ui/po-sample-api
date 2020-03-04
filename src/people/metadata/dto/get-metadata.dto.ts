import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { MetadataType } from '../metadata-type.enum';

export class GetMetadataDto {

  @ApiPropertyOptional({ enum: ['create', 'list', 'detail', 'edit'] })
  type: MetadataType;

  @ApiProperty()
  version: number;

  @ApiPropertyOptional()
  fields: Array<any>;

  @ApiPropertyOptional()
  breadcrumb;

  @ApiPropertyOptional()
  actions;

  @ApiPropertyOptional()
  autoRouter: boolean;

  @ApiPropertyOptional()
  title: string;

}
