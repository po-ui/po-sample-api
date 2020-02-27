import { Injectable } from '@nestjs/common';

import { processes, parameters } from './processes.data';

@Injectable()
export class ProcessesService {

  getProcess(processId: string) {
    return processes.find(process => process.processID === processId);
  }

  getProcesses() {
    return {
      items: processes
    };
  }

  filterProcesses(label: string) {
    const filter = label.toLowerCase().trim();

    const filteredProcesses = processes.filter(process =>
      process.description.toLowerCase().includes(filter) ||
      process.processID.toLowerCase().includes(filter)
    );

    return {
      items: filteredProcesses
    };
  }

  getParametersByProcess(processId) {
    return {
      items: parameters[processId]
    };
  }

}
