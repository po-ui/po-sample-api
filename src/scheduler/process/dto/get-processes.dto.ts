import { ApiProperty } from '@nestjs/swagger';

import { CreateProcessDto } from './create-process.dto';

export class GetProcessesDto {

  @ApiProperty({
    type: () => [CreateProcessDto],
  })
  items: Array<CreateProcessDto>;

}
