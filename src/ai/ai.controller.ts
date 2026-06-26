import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AiService } from './ai.service';
import { AiFilterRequestDto } from './dto/ai-filter-request.dto';
import { AiFilterResponseDto } from './dto/ai-filter-response.dto';

@ApiTags('ai')
@Controller('ai')
@UseGuards(ThrottlerGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiBody({ type: AiFilterRequestDto })
  @ApiResponse({ status: 200, type: AiFilterResponseDto })
  @Post('filter')
  async filter(@Body() body: AiFilterRequestDto): Promise<AiFilterResponseDto> {
    if (!body?.query || !body?.columns?.length) {
      throw new HttpException('query e columns são obrigatórios', HttpStatus.BAD_REQUEST);
    }

    return this.aiService.filter(body.query, body.columns);
  }
}
