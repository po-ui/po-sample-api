import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePeopleDto {

  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  birthdate: Date;

  // @ApiPropertyOptional()
  // genre: string;

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

  // @ApiPropertyOptional()
  // genreDescription: string;

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

}
