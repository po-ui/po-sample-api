import { Injectable, HttpException } from '@nestjs/common';

import { MENUS as menus } from './menus.data';
import { Menu } from './menu.interface';

@Injectable()
export class MenusService {

  getMenus(search: string, department: string): Promise<any> {
    const hasFilter = search || department;

    const result = hasFilter ? this.filterMenus(search, department) : menus;

    return Promise.resolve(result);
  }

  filterMenus(search: string, department: string) {

    const response = {
      items: menus.filter(menu =>
        this.includesMenuFilter(menu, 'label', search) ||
        this.includesMenuFilter(menu, 'department', department))
    };

    return response;
  }

  includesMenuFilter(menu: Menu, property: string, filter: string): boolean {
    if (!filter) { return; }

    return menu[property].toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  }

}
