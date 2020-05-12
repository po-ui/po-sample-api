import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BeforeRemoveService } from './before-remove.service';
import { GetBeforeRemoveDto } from './dto/get-beforeRemove.dto';
import { CreatePeopleDto } from '../dto/create-people.dto';

@ApiTags('people')
@Controller('people/before-remove')
export class BeforeRemoveController {
  constructor(private beforeRemoveService: BeforeRemoveService) {}

  @ApiResponse({ status: 200, type: GetBeforeRemoveDto })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreatePeopleDto })
  @Post(':id')
  getBeforeRemove(@Body() data, @Param('id') id) {
    const beforeRemove = this.beforeRemoveService.getBeforeRemove(data);
    let messages = {};

    if (!beforeRemove.allowAction) {
      messages = {
        _messages: [
          {
            code: 'INFO',
            type: 'information',
            message: 'Rota bloqueada',
            detailedMessage: 'Usuário não permitido para essa rota'
          }
        ]
      };
    }
    return { ...beforeRemove, ...messages };
  }
}
