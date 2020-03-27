import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PasswordRecoverySmsDto {

  @ApiProperty()
  hash: string;

  @ApiPropertyOptional()
  urlValidationCode: string;
}