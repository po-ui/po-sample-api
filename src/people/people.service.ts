import { Injectable, NotFoundException } from '@nestjs/common';

import { people } from './db/people.data';
import { People } from './people.interface';
import { Utils } from 'src/utils/utils';

@Injectable()
export class PeopleService {

  people = people;

  getPeople(search?: string, page?: string, pageSize?: string): { items: Array<People>, hasNext: boolean } {
    let filteredPeople = this.filter(search);
    filteredPeople = this.paginate(filteredPeople, parseInt(page, 10), parseInt(pageSize, 10));

    return {
      items: filteredPeople,
      hasNext: this.people.length > (parseInt(pageSize, 10) * parseInt(page, 10))
    };
  }

  getPerson(id: string): People {
    return this.people.find(process => process.id === id);
  }

  delete(id: string) {
    const index = this.people.findIndex(person => person.id === id);

    if (index === -1) {
      throw new NotFoundException(`Pessoa ${id} não existe!`);
    }

    this.people.splice(index, 1);
    return { message: 'Pessoa removida com sucesso' };
  }

  deleteAll(peopleToDelete) {
    peopleToDelete.forEach(person => this.delete(person.id));
  }

  save(person: People) {
    this.people.push(person);
  }

  update(id: string, updatedPeople: People) {
    const person = this.getPeople(id);
    Object.assign(person, updatedPeople);
  }

  private paginate(filteredPeople, page?: number, pageSize?: number) {
    if (pageSize || page) {
     return Utils.paginate(filteredPeople, page, pageSize);
    }

    return this.people;
  }

  private filter(search?: string) {
    return search ? Utils.filterByAll(search, this.people) : this.people;
  }

}
