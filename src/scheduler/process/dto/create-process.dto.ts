import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessDto {

  @ApiProperty()
  processID: string;

  @ApiProperty()
  description: string;

}
