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

import { HotelsService } from './hotels.service';
import { Hotel } from './interfaces/hotel.interface';
import { CreateHotelDto } from './dto/create-hotel.dto';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiResponse({ status: 404, description: 'No Data Found' })
  @ApiResponse({ status: 200, type: [CreateHotelDto] })
  @ApiQuery({name: 'filter', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'pageSize', required: false})
  @ApiQuery({name: 'order', required: false})
  @ApiQuery({name: 'value', required: false})
  @ApiQuery({name: 'id', required: false})
  @ApiQuery({name: 'name', required: false})
  @ApiQuery({name: 'cnpj', required: false})
  @ApiQuery({name: 'email', required: false})
  @ApiQuery({name: 'floors', required: false})
  @ApiQuery({name: 'category', required: false})
  @ApiQuery({name: 'phone', required: false})
  @ApiQuery({name: 'note', required: false})
  @ApiQuery({name: 'address_zip', required: false})
  @ApiQuery({name: 'address_street', required: false})
  @ApiQuery({name: 'address_number', required: false})
  @ApiQuery({name: 'address_district', required: false})
  @ApiQuery({name: 'address_city', required: false})
  @Get()
  async findByFilter(
    @Query() params?: string
  ): Promise<Array<Hotel>> {
    return this.hotelsService.getByFilter(params);
  }

  @ApiResponse({ status: 200, type: CreateHotelDto })
  @ApiQuery({name: 'filter'})
  @Get('name')
  async findByFilterName(@Query('filter') hotelName: string): Promise<Array<Hotel>> {
    return await this.hotelsService.getFilterByName(hotelName);
  }

  @ApiResponse({ status: 200, type: CreateHotelDto })
  @ApiParam({name: 'hotelName'})
  @Get('name/:hotelName')
  async findByName(@Param('hotelName') hotelName: string): Promise<Hotel> {
    return await this.hotelsService.getByName(hotelName);
  }

  @ApiResponse({ status: 200, type: CreateHotelDto })
  @ApiParam({name: 'hotelId'})
  @Get(':hotelId')
  async findByID(@Param('hotelId') hotelId: string): Promise<Hotel> {
    return await this.hotelsService.getByID(parseInt(hotelId));
  }

  @ApiResponse({ status: 201, type: CreateHotelDto })
  @ApiBody({ type: CreateHotelDto })
  @Post()
  async addhotels(@Body() hotel: CreateHotelDto): Promise<Hotel> {
    return await this.hotelsService.add(hotel);
  }

  @ApiResponse({ status: 200, description: 'Hotel removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Hotel removido com sucesso.' })
  @ApiQuery({name: 'value'})
  @Delete()
  async deletehotels(@Query('value') value: string): Promise<Hotel> {
    return await this.hotelsService.delete(value);
  }

}
