import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BeforeEditService } from './before-edit.service';
import { GetBeforeEditDto } from './dto/get-beforeEdit.dto';

@ApiTags('people')
@Controller('people/before-edit')
export class BeforeEditController {
  constructor(private beforeEditService: BeforeEditService) {}

  @ApiResponse({ status: 200, type: GetBeforeEditDto })
  @Post(':id')
  getBeforeNew() {
    const beforeEdit = this.beforeEditService.getBeforeEdit();
    let messages = {};
    if (!beforeEdit.allowAction) {
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
    return { ...beforeEdit, ...messages };
  }
}
