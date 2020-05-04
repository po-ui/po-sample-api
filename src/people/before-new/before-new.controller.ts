import { Controller, Get, Query, Post } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { BeforeNewService } from './before-new.service';
import { GetBeforeNewDto } from './dto/get-beforeNew.dto';

@ApiTags('people')
@Controller('people/before-new')
export class BeforeNewController {
  constructor(private beforeNewService: BeforeNewService) {}

  @ApiResponse({ status: 200, type: GetBeforeNewDto })
  @Post()
  getBeforeNew() {
    const beforeNew = this.beforeNewService.getBeforeNew();
    let messages = {};
    if (!beforeNew.allowAction) {
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
    return { ...beforeNew, ...messages };
  }
}
