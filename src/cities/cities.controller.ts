import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CitiesService } from './cities.service';
import { GetCitiesDto } from './dto/get-cities.dto';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {

  constructor(private citiesService: CitiesService) {}

  @ApiResponse({ status: 200, type: GetCitiesDto })
  @ApiQuery({ name: 'transform', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @Get()
  getCities(@Query() query) {
    const { transform, filter } = query;
    return this.citiesService.getCities(transform, filter);
  }

}
