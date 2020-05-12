import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetBeforeRemoveDto {
  @ApiPropertyOptional()
  allowAction: boolean;

  @ApiPropertyOptional()
  newUrl: string;
}