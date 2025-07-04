import { Controller, Body, Post, Res, Delete, Param } from '@nestjs/common';
import { BatchDeleteService } from './batch-delete.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('batchDelete')
@Controller('batchDelete')
export class BatchDeleteController {
  constructor(private readonly batchDeleteService: BatchDeleteService) {}

  @Post()
  async receiveGridData(@Body() body: any, @Res() res) {
    const result = await this.batchDeleteService.receiveGridData(body);
    return res.status(200).json(result);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Res() res) {
    const result = await this.batchDeleteService.deleteItem(id);
    return res.status(200).json(result);
  }

  @Delete('')
  async deleteItemQuery(@Res() res) {
    const query = res.req.query;
    const result = await this.batchDeleteService.deleteItemQuery(query);
    return res.status(200).json(result);
  }
}
