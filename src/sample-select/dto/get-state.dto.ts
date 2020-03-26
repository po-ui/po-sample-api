import { ApiProperty } from '@nestjs/swagger';

export class GetStateDto {

  @ApiProperty()
  value: string;

  @ApiProperty()
  label: string;

}
