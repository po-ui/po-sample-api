import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Query,
  Param
} from '@nestjs/common';

import { HeroesService } from './heroes.service';
import { Hero } from './hero.interface';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  async findByFilter(
    @Query('filter') filter?,
    @Query('page') page?,
    @Query('pageSize') pageSize?,
    @Query('order') order?
  ): Promise<Array<Hero>> {
    return this.heroesService.getByFilter(filter, page, pageSize, order);
  }

  @Get('nickname')
  async findByFilterNickname(@Query('filter') heroNickname): Promise<Array<Hero>> {
    return await this.heroesService.getFilterByNickname(heroNickname);
  }

  @Get('nickname/:heroNickname')
  async findByNickname(@Param('heroNickname') heroNickname): Promise<Hero> {
    return await this.heroesService.getByNickname(heroNickname);
  }

  @Get(':heroLabel')
  async findByName(@Param('heroLabel') heroLabel): Promise<Hero> {
    return await this.heroesService.getByLabel(heroLabel);
  }

  @Post()
  async addHero(@Body() createHero: Hero) {
    return await this.heroesService.add(createHero);
  }

  @Delete()
  async deleteHero(@Query() query) {
    return await this.heroesService.delete(query);
  }

}
