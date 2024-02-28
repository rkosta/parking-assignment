import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotsModule } from './spots/spots.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './spots/spot.entity';
import { User } from './users/user.entity';
import { Booking } from './bookings/booking.entity';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'parking',
      port: 5432,
      username: 'deskbird',
      password: 'pass@word1',
      entities: [Spot, User, Booking],
      synchronize: true,
    }),
    SpotsModule,
    BookingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
