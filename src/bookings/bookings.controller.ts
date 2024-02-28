import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dtos/booking.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { ErrorInterceptor } from 'src/interceptors/error-interceptor';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Serialize(BookingDto)
  @Get()
  async getBookings(@CurrentUser() currentUser: User) {
    return await this.bookingsService.findAll(currentUser.id);
  }

  @Get(':id')
  @Serialize(BookingDto)
  async getBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingsService.findOne(id, currentUser.id);

    // If the booking is not found, throw a NotFoundException
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  @Post('/create')
  @Serialize(BookingDto)
  async createBooking(
    @CurrentUser() currentUser: User,
    @Query('spot', ParseIntPipe) spotId: number,
  ) {
    return await this.bookingsService.createBooking(spotId, currentUser.id);
  }

  @Post(':id/end')
  async endBooking(
    @CurrentUser() currentUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.bookingsService.endBooking(id, currentUser.id);
  }
}
