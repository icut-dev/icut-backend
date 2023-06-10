import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RootModule } from '~/root/root.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards';
import { TelephonesModule } from './telephones/telephones.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TelephonesModule,
    RootModule,
    ScheduleModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
