import { Injectable } from '@nestjs/common';

export const resultError = {
  code: '404',
  message: 'Serviço de favoritos não encontrado',
  detailedMessage: 'Servidor não encontrado ou fora do ar, tente mais tarde. (Ambiente de teste)'
};

@Injectable()
export class FavoriteService {

  get code() {
    return Math.floor((Math.random()) + 0.2) ? 404 : 200;
  }

  getFavorite(url: string, body: any) {

    const isFavorite = url !== undefined ? url : Math.floor((Math.random()) + 0.5) ? false : true;

    const resultSuccess = {
      isFavorite,
      url
    };

    return this.code === 200 ? resultSuccess : resultError;
  }

  saveFavorite(body: any) {
    return this.code === 200 ? body : resultError;
  }

}
