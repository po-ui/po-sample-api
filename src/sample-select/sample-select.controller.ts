import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { SampleSelectService } from './sample-select.service';
import { GetStatesDto } from './dto/get-states.dto';
import { GetCitiesDto } from './dto/get-cities.dto';

@ApiTags('sampleSelect')
@Controller('sampleSelect')
export class SampleSelectController {

  constructor(private readonly sampleSelectService: SampleSelectService) { }

  @ApiResponse({ status: 404, description: 'State search service unavailable' })
  @ApiResponse({ status: 200, type: GetStatesDto })
  @Get('getStates')
  async getStates() {
    return this.sampleSelectService.getStates();
  }

  @ApiResponse({ status: 404, description: 'State search service unavailable' })
  @ApiResponse({ status: 200, type: GetCitiesDto })
  @Get('/getCities/:state')
  async getCitiesByState(@Param('state') state: string) {
    return this.sampleSelectService.getCitiesByState(state);
  }

  @Get('/:state')
  test(@Param('state') state, @Res() res) {
  return res.sendFile(state, { root: 'public/assets' });
  }

}
