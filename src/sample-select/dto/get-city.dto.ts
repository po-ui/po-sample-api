import { ApiProperty } from '@nestjs/swagger';

export class GetCityDto {

  @ApiProperty()
  value: number;

  @ApiProperty()
  label: string;

}
