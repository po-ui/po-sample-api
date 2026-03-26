import { Injectable, NotFoundException } from '@nestjs/common';

import { employees } from './db/employees.data';
import { Employee } from './interfaces/employee.interface';
import { applyODataFilter } from './odata-filter.parser';
import { Utils } from 'src/utils/utils';

@Injectable()
export class EmployeesService {

  employees = [...employees];

  getEmployees(search?: string, filter?: string, page?: string, pageSize?: string): { items: Array<Employee>, hasNext: boolean } {
    let filteredEmployees = this.employees;

    if (filter) {
      filteredEmployees = applyODataFilter(filteredEmployees as Array<Employee & Record<string, unknown>>, filter);
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

}
