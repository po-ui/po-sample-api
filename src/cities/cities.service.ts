import { Injectable } from '@nestjs/common';

import { cities } from './db/cities.data';

@Injectable()
export class CitiesService {

  getCities(transform?: string, filter?: string) {
    const filteredCities = filter ? this.filter(filter) : cities;

    const items = transform === 'true' ?
      filteredCities.map(this.transformCitiesWithOptions) :
      filteredCities.map(this.getCitiesWithPropertiesDefault);

    return {
      hasNext: false,
      items
    };
  }

  private filter(filter: string) {
    const pattern = new RegExp(filter, 'i');
    return cities.filter(city => pattern.test(city.name));
  }

  private getCitiesWithPropertiesDefault(city: any) {
    return {
      ibge: city.ibge,
      name: city.name,
      state: city.state
    };
  }

  transformCitiesWithOptions(city: any) {
    return {
      ibge: city.ibge,
      name: city.name,
      state: city.state,
      value: city.ibge,
      label: city.name
    };
  }

}
