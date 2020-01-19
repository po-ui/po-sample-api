import { Injectable, NotFoundException } from '@nestjs/common';

import { HEROES } from './heroes.data';

import { Hero } from './interfaces/hero.interface';

@Injectable()
export class HeroesService {

  heroes = HEROES;

  add(hero: Hero): Promise<any> {
    return new Promise(resolve => {
      this.heroes.push(hero);
      resolve(hero);
    });
  }

  delete(value: string): Promise<any> {
    const id = Number(value);
    return new Promise(resolve => {
      const index = this.heroes.findIndex(hero => hero.value === id);

      if (index === -1) {
        throw new NotFoundException('Hero does not exist!');
      }

      this.heroes.splice(index, 1);
      resolve({message: 'Hero removido com sucesso'});
    });
  }

  get(filter?: string): Promise<any> {
    const heroes = filter ? this.filterByProperty(filter, this.heroes, 'nickname') : this.heroes;

    return Promise.resolve({ items: heroes });
  }

  getByFilter(filter?: string, page?: number, pageSize?: number, order?: string): Promise<any> {
    const heroes = this.filter(filter, page, pageSize, order);
    return Promise.resolve({ items: heroes, hasNext: this.heroes.length > pageSize});
  }

  getByLabel(name: string): Promise<Hero> {
    name = (name || '').toLocaleLowerCase();

    const result = this.heroes.find(hero => hero.label.toLocaleLowerCase() === name);

    return Promise.resolve(result);
  }

  getByNickname(nickname: string): Promise<Hero> {
    nickname = (nickname || '').toLocaleLowerCase();

    const result = this.heroes.find(hero => hero.nickname.toLocaleLowerCase() === nickname);

    return Promise.resolve(result);
  }

  getFilterByNickname(nickname: string): Promise<any> {
    nickname = (nickname || '').toLocaleLowerCase();

    const result = this.filterByProperty(nickname, this.heroes, 'nickname');

    return Promise.resolve({ items: result });
  }

  private filter(name: string, page?: number, pageSize?: number, order?: string) {
    name = (name || '').toLocaleLowerCase();

    let heroes = this.filterByProperty(name, this.heroes, 'label');

    if (order) {
      heroes = this.sort(heroes, order);
    }

    if (pageSize || page) {
      heroes = this.paginate(heroes, page, pageSize);
    }

    return heroes;
  }

  private filterByProperty(filter: string, heroes: Array<Hero>, property: string): Array<Hero> {
    const result = [];

    heroes.filter(hero => {
      if (hero[property].toLocaleLowerCase().includes(filter)) {
        result.push(hero);
      }
    });
    return result;
  }

  private sort(heroes: Array<Hero>, order: string): Array<Hero> {
    return heroes.sort((value, previousValue) =>
      (value[order] > previousValue[order]) ? 1 : ((previousValue[order] > value[order]) ? -1 : 0));
  }

  private paginate(heroes: Array<Hero>, page: number = 1, pageSize: number): Array<Hero> {
    return heroes.slice((page - 1) * pageSize, page * pageSize);
  }

}
