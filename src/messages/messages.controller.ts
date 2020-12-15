import { Controller, Query, Body, Post, Get, Res } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {

  constructor(private readonly messagesService: MessagesService) { }

  // 
  @Get('/')
  async getMessages(@Body() message: object, @Query() query, @Res() res) {
    return this.messagesService.getMessages(message, query, res);
  }

  @Post()
  async postMessages(@Query('status') status: string, @Body() message: object) {
    return this.messagesService.postMessages(status, message);
  }

}
