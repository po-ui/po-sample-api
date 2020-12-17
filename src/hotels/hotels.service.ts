import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';

import { HOTELS, NOT_FOUND as noDataFound } from './hotels.data';

import { Hotel } from './interfaces/hotel.interface';

@Injectable()
export class HotelsService {

  hotels = HOTELS;

  add(hotels: Hotel): Promise<any> {
    return new Promise(resolve => {
      this.hotels.push(hotels);
      resolve(hotels);
    });
  }

  delete(value: string): Promise<any> {
    const id = Number(value);
    return new Promise(resolve => {
      const index = this.hotels.findIndex(hotels => hotels.value === id);

      if (index === -1) {
        throw new NotFoundException('Hotel does not exist!');
      }

      this.hotels.splice(index, 1);
      resolve({message: 'Hotel removido com sucesso'});
    });
  }

  get(filter?: string): Promise<any> {
    const hotels = filter ? this.filterByProperty(filter, this.hotels, 'name') : this.hotels;

    return Promise.resolve({ items: hotels });
  }

  getByFilter(params: any): Promise<any> {
    const { hotels, hasNext } = this.filter(params);

    if (params && hotels.length === 0) {
      throw new HttpException(noDataFound, HttpStatus.NOT_FOUND);
    }

    return Promise.resolve({ items: hotels, hasNext });
  }

  getByID(id: number): Promise<Hotel> {
    const result = this.hotels.find(hotels => hotels.id === id);

    return Promise.resolve(result);
  }

  getByCNPJ(cnpj: string): Promise<Hotel> {
    const result = this.hotels.find(hotels => hotels.cnpj.toLocaleLowerCase() === cnpj.toLocaleLowerCase());

    return Promise.resolve(result);
  }

  getByName(name: string): Promise<Hotel> {
    const result = this.hotels.find(hotels => hotels.name.toLocaleLowerCase() === name.toLocaleLowerCase());

    return Promise.resolve(result);
  }

  getFilterByName(name: string): Promise<any> {
    const result = this.filterByProperty(name, this.hotels, 'name');

    return Promise.resolve({ items: result });
  }

  private hasNext(items = [], pageSize = 0, page = 0) {
    return items.length > (pageSize * page);
  }

  private filter(params: any) {
    const { filter, page, pageSize, order, ...restParams } = params;
    let hotels: Array<Hotel> = [];

    if (restParams && Object.keys(restParams).length > 0 ) {
      hotels = this.filterByAdvancedProperty(restParams, this.hotels);
    } else {
      hotels = this.filterByProperty(filter, this.hotels, 'cnpj');
    }

    const hasNext = this.hasNext(hotels, pageSize, page);

    if (order) {
      hotels = this.sort(hotels, order);
    }

    if (pageSize || page) {
      hotels = this.paginate(hotels, page, pageSize);
    }

    return { hotels, hasNext };
  }

  private filterByAdvancedProperty(advancedFilters: any, hotels: Array<Hotel>): Array<Hotel> {
    let result = [];

    result = hotels.filter((item) => {
      for (const key in advancedFilters) {
        if (item[key] === undefined || item[key].toString() !== advancedFilters[key].toString()) {
          return false;
        }
      }
      return true;
    });

    return result;
  }

  private filterByProperty(filter: string, hotels: Array<Hotel>, property: string): Array<Hotel> {
    filter = (filter || '').toLocaleLowerCase();
    const result = [];

    hotels.forEach(hotels => {
      if (hotels[property].toLocaleLowerCase().includes(filter)) {
        result.push(hotels);
      }
    });
    return result;
  }

  private sort(hotels: Array<Hotel>, order: string): Array<Hotel> {
    return hotels.sort((value, previousValue) =>
      (value[order] > previousValue[order]) ? 1 : ((previousValue[order] > value[order]) ? -1 : 0));
  }

  private paginate(hotels: Array<Hotel>, page: number = 1, pageSize: number): Array<Hotel> {
    return hotels.slice((page - 1) * pageSize, page * pageSize);
  }

}
