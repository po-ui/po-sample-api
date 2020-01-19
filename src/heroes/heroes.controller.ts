import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Query,
  Param
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger'

import { HeroesService } from './heroes.service';
import { Hero } from './interfaces/hero.interface';
import { CreateHeroDto } from './dto/create-hero.dto';

@ApiTags('heroes')
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @ApiResponse({ status: 200, type: [CreateHeroDto] })
  @ApiQuery({name: 'filter', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'pageSize', required: false})
  @ApiQuery({name: 'order', required: false})
  @Get()
  async findByFilter(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('order') order?: string
  ): Promise<Array<Hero>> {
    return this.heroesService.getByFilter(filter, page, pageSize, order);
  }

  @ApiResponse({ status: 200, type: CreateHeroDto })
  @ApiQuery({name: 'filter'})
  @Get('nickname')
  async findByFilterNickname(@Query('filter') heroNickname: string): Promise<Array<Hero>> {
    return await this.heroesService.getFilterByNickname(heroNickname);
  }

  @ApiResponse({ status: 200, type: CreateHeroDto })
  @ApiParam({name: 'heroNickname'})
  @Get('nickname/:heroNickname')
  async findByNickname(@Param('heroNickname') heroNickname: string): Promise<Hero> {
    return await this.heroesService.getByNickname(heroNickname);
  }

  @ApiResponse({ status: 200, type: CreateHeroDto })
  @ApiParam({name: 'heroLabel'})
  @Get(':heroLabel')
  async findByName(@Param('heroLabel') heroLabel: string): Promise<Hero> {
    return await this.heroesService.getByLabel(heroLabel);
  }

  @ApiResponse({ status: 201, type: CreateHeroDto })
  @ApiBody({ type: CreateHeroDto })
  @Post()
  async addHero(@Body() hero: CreateHeroDto): Promise<Hero> {
    return await this.heroesService.add(hero);
  }

  @ApiResponse({ status: 200, description: 'Hero removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Hero removido com sucesso.' })
  @ApiQuery({name: 'value'})
  @Delete()
  async deleteHero(@Query('value') value: string): Promise<Hero> {
    return await this.heroesService.delete(value);
  }

}
