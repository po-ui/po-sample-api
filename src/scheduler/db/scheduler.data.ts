import { Scheduler } from '../scheduler.interface';

export const schedulers: Array<Scheduler> = [
  {
    id: '0148093543698',
    daily: {
      hour: 8,
      minute: 0
    },
    executionParameter: {
      options: ['installDependencies', 'unitTest', 'lint']
    },
    firstExecution: '2021-11-10T17:55:00-03:00',
    processID: 'process3',
    rangeExecutions: {
        frequency: {
          type: 'hour',
          value: 2
        },
        rangeLimit: {
          hour: 18,
          minute: 0
        }
      },
    recurrent: true,
  },
  {
    id: '0148093543699',
    monthly: {
      day: 2,
      hour: 2,
      minute: 30
    },
    executionParameter: {
      options: ['installDependencies']
    },
    firstExecution: '2021-11-10T17:55:00-03:00',
    processID: 'process1',
    recurrent: true,
  },
  {
    id: '0148093543697',
    weekly: {
      daysOfWeek: ['Sunday', 'Friday', 'Tuesday'],
      hour: 18,
      minute: 0
    },
    executionParameter: {
      options: ['installDependencies']
    },
    firstExecution: '2021-11-10T17:55:00-03:00',
    processID: 'process2',
    recurrent: true,
  },
];
