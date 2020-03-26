import { ApiProperty } from '@nestjs/swagger';
import { GetStateDto } from './get-state.dto';

export class GetStatesDto {

  @ApiProperty({
    type: () => [GetStateDto],
  })
  items: Array<GetStateDto>;

}
