import { Module } from '@nestjs/common';

import { PasswordRecoveryService } from './password-recovery.service';
import { UsersController } from './users.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AuthenticationService, PasswordRecoveryService],
})
export class UsersModule {}
