import { ApiProperty } from '@nestjs/swagger';

export class AiFilterColumnDto {
  @ApiProperty()
  property: string;

  @ApiProperty()
  label: string;

  @ApiProperty({ required: false, default: 'string' })
  type?: string;
}

export class AiFilterRequestDto {
  @ApiProperty()
  query: string;

  @ApiProperty({ type: [AiFilterColumnDto] })
  columns: AiFilterColumnDto[];
}
