import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {

  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  age: number;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  department: string;

  @ApiPropertyOptional()
  salary: number;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  hireDate: string;

}
