import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetBeforeEditDto {
  @ApiPropertyOptional()
  allowAction: boolean;

  @ApiPropertyOptional()
  newUrl: string;
}
