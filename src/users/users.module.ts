import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Booking } from 'src/bookings/booking.entity';
import { RolePermission } from 'src/permissions/role-permision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking, RolePermission])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
