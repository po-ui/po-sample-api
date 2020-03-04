import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCitiesDto {

  @ApiPropertyOptional()
  uf: string;

  @ApiPropertyOptional()
  ibge: string;

  @ApiPropertyOptional()
  state: string;

  @ApiPropertyOptional()
  name: string;

}
