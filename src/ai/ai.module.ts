import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 5 })],
  controllers: [AiController],
  providers: [AiService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AiModule {}
