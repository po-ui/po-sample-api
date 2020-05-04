import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetBeforeNewDto {
  @ApiPropertyOptional()
  allowAction: boolean;

  @ApiPropertyOptional()
  newUrl: string;
}
