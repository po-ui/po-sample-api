import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';

import { HEROES, NOT_FOUND as noDataFound } from './heroes.data';

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

  getByFilter(params: any): Promise<any> {
    let result = [];

    if (params instanceof Array) {
      params.forEach(item => {
        this.heroes.forEach(hero => {
          if (hero.value.toString() === item) {
            result = [...result, hero];
          }
        });
      });
    }

    const { hasNext, heroes } = this.filter(params);
    result = result.length > 0 ? result : heroes;

    if (params && result.length === 0) {
      throw new HttpException(noDataFound, HttpStatus.NOT_FOUND);
    }

    return Promise.resolve({ items: result, hasNext });
  }

  getByLabel(name: string): Promise<Hero> {
    const result = this.heroes.find(hero => hero.label.toLocaleLowerCase() === name.toLocaleLowerCase());

    return Promise.resolve(result);
  }

  getByNickname(nickname: string): Promise<Hero> {
    const result = this.heroes.find(hero => hero.nickname.toLocaleLowerCase() === nickname.toLocaleLowerCase());

    return Promise.resolve(result);
  }

  getFilterByNickname(nickname: string): Promise<any> {
    const result = this.filterByProperty(nickname, this.heroes, 'nickname');

    return Promise.resolve({ items: result });
  }

  private hasNext(items = [], pageSize = 0, page = 0) {
    return items.length > (pageSize * page);
  }

  private filter(params: any) {
    const { filter, page, pageSize, order, ...restParams } = params;
    let heroes: Array<Hero> = [];

    if (restParams && Object.keys(restParams).length > 0 ) {
      heroes = this.filterByAdvancedProperty(restParams, this.heroes);
    } else {
      heroes = this.filterByProperty(filter, this.heroes, 'label');
    }

    const hasNext = this.hasNext(heroes, pageSize, page);

    if (order) {
      heroes = this.sort(heroes, order);
    }

    if (pageSize || page) {
      heroes = this.paginate(heroes, page, pageSize);
    }

    return { heroes, hasNext };
  }

  private filterByAdvancedProperty(advancedFilters: any, heroes: Array<Hero>): Array<Hero> {
    let result = [];

    result = heroes.filter((item) => {
      for (const key in advancedFilters) {
        if (item[key] === undefined || item[key].toString() !== advancedFilters[key].toString()) {
          return false;
        }
      }
      return true;
    });

    return result;
  }

  private filterByProperty(filter: string, heroes: Array<Hero>, property: string): Array<Hero> {
    filter = (filter || '').toLocaleLowerCase();
    const result = [];

    heroes.forEach(hero => {
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
