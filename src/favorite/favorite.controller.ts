import { ApiTags, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Query, Body, Post } from '@nestjs/common';

import { FavoriteService } from './favorite.service';
import { SaveFavoriteDto } from './dto/save-favorite.dto';

@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {

  constructor(private readonly favoriteService: FavoriteService) { }

  // https://<url>/<favorite>?url=/my-url/123
  @ApiResponse({ status: 404, description: 'Serviço de favoritos não encontrado.' })
  @ApiResponse({ status: 200, type: SaveFavoriteDto })
  @ApiQuery({ name: 'url' })
  @Get('/')
  async getFavorite(@Query('url') url: string) {
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
  @ApiResponse({ status: 201, type: SaveFavoriteDto})
  @ApiBody({ type: [SaveFavoriteDto] })
  @Post('/')
  async saveFavorite(@Body() favorite: SaveFavoriteDto) {
    return this.favoriteService.saveFavorite(favorite);
  }

}
