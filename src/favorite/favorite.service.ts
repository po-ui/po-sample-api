import { Injectable, NotFoundException } from '@nestjs/common';

import { SaveFavoriteDto } from './dto/save-favorite.dto';

@Injectable()
export class FavoriteService {

  get code() {
    return Math.floor((Math.random()) + 0.2) ? 404 : 200;
  }

  getFavorite(url: string) {
    try {
      const isFavorite = url !== undefined ? url : Math.floor((Math.random()) + 0.5) ? false : true;

      const resultSuccess = {
        isFavorite,
        url
      };
      return resultSuccess;
    } catch(error) {
      throw new NotFoundException('Serviço de favoritos não encontrado');
    }
  }

  saveFavorite(body: SaveFavoriteDto) {
    return body;
  }

}
