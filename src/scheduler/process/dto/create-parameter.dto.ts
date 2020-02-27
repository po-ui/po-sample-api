import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateParameterDto {

  @ApiPropertyOptional()
  columns: Array<any>;

  @ApiPropertyOptional()
  required: boolean;

  @ApiPropertyOptional()
  optional: boolean;

  @ApiPropertyOptional()
  options: Array<{ label: string, value: string | number }>;

  @ApiPropertyOptional()
  optionsMulti: boolean;

  @ApiPropertyOptional()
  optionsService: string;

  @ApiPropertyOptional()
  searchService: string;

  @ApiPropertyOptional()
  mask: string;

  @ApiPropertyOptional()
  pattern: string;

  @ApiPropertyOptional()
  minLength: number;

  @ApiPropertyOptional()
  maxLength: number;

  @ApiPropertyOptional()
  disabled: boolean;

  @ApiPropertyOptional()
  help: string;

  @ApiPropertyOptional()
  booleanTrue: string;

  @ApiPropertyOptional()
  booleanFalse: string;

  @ApiPropertyOptional()
  maxValue: string | number;

  @ApiPropertyOptional()
  minValue: string | number;

  @ApiPropertyOptional()
  rows: number;

  @ApiPropertyOptional()
  secret: boolean;

  @ApiPropertyOptional()
  params: any;

  @ApiPropertyOptional()
  errorMessage: string;

  @ApiPropertyOptional()
  key: boolean;

  @ApiProperty()
  property: string;

  @ApiPropertyOptional()
  label: string;

  @ApiPropertyOptional()
  gridColumns: number;

  @ApiPropertyOptional()
  gridSmColumns: number;

  @ApiPropertyOptional()
  gridMdColumns: number;

  @ApiPropertyOptional()
  gridLgColumns: number;

  @ApiPropertyOptional()
  gridXlColumns: number;

  @ApiPropertyOptional()
  visible: boolean;

  @ApiPropertyOptional()
  divider: string;

  @ApiPropertyOptional()
  type: string;

}
