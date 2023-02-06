export interface Scheduler {

  id: string;

  daily?: { hour: number, minute: number };

  executionParameter?: object;

  firstExecution?: string;

  monthly?: { day: number, hour: number, minute: number };

  processID: string;

  recurrent?: boolean;

  weekly?: { daysOfWeek: Array<string>, hour: number, minute: number };

  rangeExecutions?: {
    frequency: { type: string, value: number },
    rangeLimit: { hour: number, minute: number }
  };

}
