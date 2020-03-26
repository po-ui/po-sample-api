import { Injectable, NotFoundException } from '@nestjs/common';
import { states, saoPauloCities, santaCatarinaCities, paranaCities } from './sample-select.data';

@Injectable()
export class SampleSelectService {

  getStates() {
    return {
      hasNext: false,
      items: states
    };
  }

  getCitiesByState(state: string) {
    let cities;
    switch (state) {
      case 'sp':
      cities = saoPauloCities;
      break;
      case 'sc':
      cities = santaCatarinaCities;
      break;
      case 'pr':
      cities = paranaCities;
      break;
    }

    return {
      hasNext: false,
      items: cities
    };
  }

}
