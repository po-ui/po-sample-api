import { ApiProperty } from '@nestjs/swagger';

import { CreatePeopleDto } from './create-people.dto';

export class GetPeopleDto {

  @ApiProperty({
    type: () => [CreatePeopleDto],
  })
  items: Array<CreatePeopleDto>;

}
