import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValidateCodeSmsResponseDto {

  @ApiProperty()
  token: string;

  @ApiPropertyOptional()
  urlChangePassword: string;
}
