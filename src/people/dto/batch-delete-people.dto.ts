import { ApiProperty } from '@nestjs/swagger';
import { CreatePeopleDto } from './create-people.dto';

export class BatchDeletePeopleDto {
  @ApiProperty({ type: [CreatePeopleDto] })
  items: CreatePeopleDto[];

  @ApiProperty({ type: [String], required: false })
  keys?: string[];

  @ApiProperty({ type: Number, required: false })
  total?: number;

  @ApiProperty({ type: String, required: false })
  paramDelete?: string;
}
