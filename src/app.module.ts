import { Module } from '@nestjs/common';

import { HeroesModule } from './heroes/heroes.module';
import { MenusModule } from './menus/menus.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HeroesModule,
    MenusModule,
    MessagesModule,
    UsersModule
  ]
})
export class AppModule {}
