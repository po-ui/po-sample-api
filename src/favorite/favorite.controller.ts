import { Controller, Get, Query, Body, Post } from '@nestjs/common';

import { FavoriteService } from './favorite.service';
import { ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { SaveFavoriteDto } from './dto/save-favorite.dto';

@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {

  constructor(private readonly favoriteService: FavoriteService) { }

  // https://<url>/<favorite>?url=/my-url/123
  @ApiQuery({name: 'url'})
  @Get('/')
  async getFavorite(@Query('url') url: any) {
    return this.favoriteService.getFavorite(url);
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
  @ApiBody({ type: [SaveFavoriteDto] })
  @Post('/')
  async saveFavorite(@Body() favorite: SaveFavoriteDto) {
    return this.favoriteService.saveFavorite(favorite);
  }

}
