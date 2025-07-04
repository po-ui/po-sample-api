import { Module } from '@nestjs/common';

import { HeroesModule } from './heroes/heroes.module';
import { MenusModule } from './menus/menus.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { FavoriteModule } from './favorite/favorite.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SampleSelectModule } from './sample-select/sample-select.module';
import { PeopleModule } from './people/people.module';
import { CitiesModule } from './cities/cities.module';
import { HotelsModule } from './hotels/hotels.module';
import { UploadModule } from './upload/upload.module';
import { BatchDeleteModule } from './batch-delete/batch-delete.module';

@Module({
  imports: [
    FavoriteModule,
    HeroesModule,
    MenusModule,
    MessagesModule,
    HotelsModule,
    UsersModule,
    SchedulerModule,
    SampleSelectModule,
    PeopleModule,
    CitiesModule,
    UploadModule,
    BatchDeleteModule
  ]
})
export class AppModule {}
