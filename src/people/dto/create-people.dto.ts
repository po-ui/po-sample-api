import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePeopleDto {

  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  birthdate: Date;

  @ApiPropertyOptional()
  genre: string;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  status: 'active' | 'inactive';

  @ApiPropertyOptional()
  nickname: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  nationality: string;

  @ApiPropertyOptional()
  birthPlace: string;

  @ApiPropertyOptional()
  graduation: string;

  @ApiPropertyOptional()
  father: string;

  @ApiPropertyOptional()
  mother: string;

  @ApiPropertyOptional()
  street: string;

  @ApiPropertyOptional()
  country: string;

  @ApiPropertyOptional()
  genreDescription: string;

  @ApiPropertyOptional()
  statusDescription: string;

  @ApiPropertyOptional()
  cityName: string;

  @ApiPropertyOptional()
  state: string;

  @ApiPropertyOptional()
  uf: string;

  @ApiPropertyOptional()
  dependents: Array<any>;

  @ApiPropertyOptional({ description: 'Mês/ano em ISO Basic (yyyy-MM-dd). Ex.: 2026-10-01' })
  mesAnoBasic: string;

  @ApiPropertyOptional({ description: 'Mês/ano em ISO Extended. Ex.: 2026-10-01T00:00:00-03:00' })
  mesAnoExtended: string;

  @ApiPropertyOptional({ description: 'Mês/ano sem ISO (MM/yyyy). Ex.: 10/2026' })
  mesAnoSemIso: string;

  @ApiPropertyOptional({ description: 'Ano em ISO Basic (yyyy-MM-dd). Ex.: 2026-01-01' })
  anoBasic: string;

  @ApiPropertyOptional({ description: 'Ano em ISO Extended. Ex.: 2026-01-01T00:00:00-03:00' })
  anoExtended: string;

  @ApiPropertyOptional({ description: 'Ano sem ISO (yyyy). Ex.: 2026' })
  anoSemIso: string;

  @ApiPropertyOptional({ description: 'Mês/ano em ISO Basic para coluna com limite de período' })
  mesAnoLimitado: string;

  @ApiPropertyOptional({ description: 'Mês/ano em ISO Basic para coluna obrigatória' })
  mesAnoObrigatorio: string;

}
