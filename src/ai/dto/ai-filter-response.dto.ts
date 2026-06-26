import { ApiProperty } from '@nestjs/swagger';

export class AiFilterResponseDto {
  @ApiProperty()
  filter: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ minimum: 0, maximum: 1 })
  confidence: number;
}
