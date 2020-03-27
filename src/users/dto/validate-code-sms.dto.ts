import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeSmsDto {

  @ApiProperty()
  hash: string;

  @ApiProperty()
  code: string;
}
