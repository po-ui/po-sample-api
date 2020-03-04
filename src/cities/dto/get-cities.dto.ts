import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateCitiesDto } from './create-cities.dto';

export class GetCitiesDto {

  @ApiProperty({
    type: () => [CreateCitiesDto],
  })
  items: Array<CreateCitiesDto>;

  @ApiPropertyOptional()
  hasNext: boolean;

}
