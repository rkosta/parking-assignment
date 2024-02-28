import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { plainToClass } from 'class-transformer';
import { BookingDto } from './dtos/booking.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async getBookings(@CurrentUser() currentUser: User) {
    return (await this.bookingsService.findAll(currentUser.id)).map((booking) =>
      plainToClass(BookingDto, booking, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  async getBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingsService.findOne(id, currentUser.id);

    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return plainToClass(BookingDto, booking, {
      excludeExtraneousValues: true,
    });
  }
}
