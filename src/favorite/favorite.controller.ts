import { Controller, Get, Query, Body, Post } from '@nestjs/common';

import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {

  constructor(private readonly favoriteService: FavoriteService) { }

  // https://<url>/<favorite>?url=/my-url/123
  @Get('/')
  async getFavorite(@Query('url') url: any, @Body() body: object) {
    return this.favoriteService.getFavorite(url, body);
  }

 /**
  * POST https://<url>/<favorite>
  *
  * {
  *      isFavorite: true || false,
  *      url: "/xyz/123"
  *      ?params: ?params
  * }
  */
  @Post('/')
  async saveFavorite(@Body() favorite: object) {
    return this.favoriteService.saveFavorite(favorite);
  }

}
