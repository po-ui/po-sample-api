import { ApiPropertyOptional } from '@nestjs/swagger';

export class PasswordRecoveryDto {

  @ApiPropertyOptional()
  sms: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  retry: number;
}