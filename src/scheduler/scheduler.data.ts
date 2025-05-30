import { Scheduler } from './scheduler.interface';

export const schedules: Array<Scheduler> = [
  {
    firstExecution: '2020-02-26T09:30:00-03:00',
    recurrent: false,
    executionParameter: {
      version: '1.22.0',
      packages: ['ui']
    },
    processID: 'process1',
    id: '1',
  }
];
