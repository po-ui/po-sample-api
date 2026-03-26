import { Injectable, NotFoundException } from '@nestjs/common';

import { employees } from './db/employees.data';
import { Employee } from './interfaces/employee.interface';
import { Utils } from 'src/utils/utils';

@Injectable()
export class EmployeesService {

  employees = [...employees];

  getEmployees(search?: string, filter?: string, page?: string, pageSize?: string): { items: Array<Employee>, hasNext: boolean } {
    let filteredEmployees = this.employees;

    if (filter) {
      filteredEmployees = this.applyODataFilter(filteredEmployees, filter);
    } else if (search) {
      filteredEmployees = Utils.filterByAll(search, filteredEmployees);
    }

    const total = filteredEmployees.length;
    const parsedPage = page ? parseInt(page, 10) : undefined;
    const parsedPageSize = pageSize ? parseInt(pageSize, 10) : undefined;
    filteredEmployees = this.paginate(filteredEmployees, parsedPage, parsedPageSize);

    return {
      items: filteredEmployees,
      hasNext: parsedPageSize ? total > (parsedPageSize * (parsedPage || 1)) : false
    };
  }

  getEmployee(id: number): Employee {
    const employee = this.employees.find(e => e.id === id);

    if (!employee) {
      throw new NotFoundException(`Funcionário ${id} não encontrado!`);
    }

    return employee;
  }

  save(employee: Employee) {
    const id = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
    this.employees.push({ ...employee, id });
  }

  update(id: number, updatedEmployee: Employee) {
    const employee = this.getEmployee(id);
    Object.assign(employee, updatedEmployee);
  }

  delete(id: number) {
    const index = this.employees.findIndex(e => e.id === id);

    if (index === -1) {
      throw new NotFoundException(`Funcionário ${id} não encontrado!`);
    }

    this.employees.splice(index, 1);
    return { message: 'Funcionário removido com sucesso' };
  }

  private paginate(filteredEmployees: Array<Employee>, page?: number, pageSize?: number) {
    if (pageSize || page) {
      return Utils.paginate(filteredEmployees, page, pageSize);
    }

    return filteredEmployees;
  }

  private applyODataFilter(items: Array<Employee>, filter: string): Array<Employee> {
    const conditions = filter.split(/\s+and\s+/i);

    return items.filter(item => {
      return conditions.every(condition => this.evaluateCondition(item, condition.trim()));
    });
  }

  private evaluateCondition(item: any, condition: string): boolean {
    // contains(property, 'value')
    const containsMatch = condition.match(/contains\((\w+),\s*'([^']+)'\)/i);
    if (containsMatch) {
      const value = String(item[containsMatch[1]] || '').toLowerCase();
      return value.includes(containsMatch[2].toLowerCase());
    }

    // startswith(property, 'value')
    const startsWithMatch = condition.match(/startswith\((\w+),\s*'([^']+)'\)/i);
    if (startsWithMatch) {
      const value = String(item[startsWithMatch[1]] || '').toLowerCase();
      return value.startsWith(startsWithMatch[2].toLowerCase());
    }

    // endswith(property, 'value')
    const endsWithMatch = condition.match(/endswith\((\w+),\s*'([^']+)'\)/i);
    if (endsWithMatch) {
      const value = String(item[endsWithMatch[1]] || '').toLowerCase();
      return value.endsWith(endsWithMatch[2].toLowerCase());
    }

    // property op 'string_value'
    const stringMatch = condition.match(/(\w+)\s+(eq|ne)\s+'([^']+)'/);
    if (stringMatch) {
      const value = String(item[stringMatch[1]] || '');
      const compareValue = stringMatch[3];
      if (stringMatch[2] === 'eq') {
        return value.toLowerCase() === compareValue.toLowerCase();
      }
      return value.toLowerCase() !== compareValue.toLowerCase();
    }

    // property op date_value (YYYY-MM-DD)
    const dateMatch = condition.match(/(\w+)\s+(eq|ne|gt|ge|lt|le)\s+(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      const value = new Date(item[dateMatch[1]]).getTime();
      const compareValue = new Date(dateMatch[3]).getTime();
      switch (dateMatch[2]) {
        case 'eq': return value === compareValue;
        case 'ne': return value !== compareValue;
        case 'gt': return value > compareValue;
        case 'ge': return value >= compareValue;
        case 'lt': return value < compareValue;
        case 'le': return value <= compareValue;
      }
    }

    // property op number_value
    const numberMatch = condition.match(/(\w+)\s+(eq|ne|gt|ge|lt|le)\s+(\d+(?:\.\d+)?)/);
    if (numberMatch) {
      const value = Number(item[numberMatch[1]]);
      const compareValue = Number(numberMatch[3]);
      switch (numberMatch[2]) {
        case 'eq': return value === compareValue;
        case 'ne': return value !== compareValue;
        case 'gt': return value > compareValue;
        case 'ge': return value >= compareValue;
        case 'lt': return value < compareValue;
        case 'le': return value <= compareValue;
      }
    }

    return true;
  }

}
