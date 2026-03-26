import { ApiProperty } from '@nestjs/swagger';

import { CreateEmployeeDto } from './create-employee.dto';

export class GetEmployeesDto {

  @ApiProperty({
    type: () => [CreateEmployeeDto],
  })
  items: Array<CreateEmployeeDto>;

  @ApiProperty()
  hasNext: boolean;

}
