import { ApiProperty } from '@nestjs/swagger';
import { GetCityDto } from './get-city.dto';

export class GetCitiesDto {

  @ApiProperty({
    type: () => [GetCityDto],
  })
  items: Array<GetCityDto>;

}
