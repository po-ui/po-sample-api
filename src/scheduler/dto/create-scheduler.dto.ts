import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchedulerDto {

  @ApiPropertyOptional()
  daily: { hour: number, minute: number };

  @ApiPropertyOptional()
  executionParameter: object;

  @ApiPropertyOptional()
  firstExecution: string;

  @ApiPropertyOptional()
  monthly: { day: number, hour: number, minute: number };

  @ApiProperty()
  processID: string;

  @ApiPropertyOptional()
  recurrent: boolean;

  @ApiPropertyOptional()
  weekly: { daysOfWeek: Array<string>, hour: number, minute: number };

  @ApiPropertyOptional()
  rangeExecutions: {
    frequency: { type: string, value: number },
    rangeLimit: { day: number, hour: number, minute: number }
  };

}
