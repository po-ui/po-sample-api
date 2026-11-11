import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  // ThrottlerModule continua importado para o @UseGuards(ThrottlerGuard) do AiController.
  // Removido o APP_GUARD global: ele aplicava o throttle (5 req/60s) a TODA a aplicacao,
  // inclusive /v1/heroes do lookup, causando HTTP 429 intermitente. Agora o throttle fica
  // restrito as rotas de IA (que ja tem @UseGuards(ThrottlerGuard) no proprio controller).
  imports: [ThrottlerModule.forRoot({ ttl: 60, limit: 5 })],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
