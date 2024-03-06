import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Spot } from '../spots/spot.entity';
import { UnauthorizedError } from '../common/errors/unauthorized.error';
import { UsersService } from '../users/users.service';
import { Permission } from '../permissions/permission.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
    private userService: UsersService,
  ) {}

  async createBooking(spotId: number, userId: number) {
    // Find the spot and user
    const [spot, user] = await Promise.all([
      this.spotRepository.findOneBy({ id: spotId }),
      this.userService.findOneById(userId),
    ]);
    if (!spot) {
      throw new EntityNotFoundError('Spot', spotId);
    }

    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    // Create a new booking
    const newBooking = this.bookingRepository.create({
      start: new Date(),
      spot,
      user,
    });
    // Save the booking
    const result = await this.bookingRepository.save(newBooking);
    return result;
  }

  async endBooking(bookingId: number, userId: number) {
    // Find the booking and user
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['spot', 'user'],
    });

    // Check if the booking exists
    if (!booking) {
      throw new EntityNotFoundError('Booking', bookingId);
    }

    // check if the booking already ended
    if (booking.end) {
      throw new Error('Booking already ended');
    }

    const userPermissions = await this.userService.getUserPermissions(userId);

    // Check if the user is authorized to end the booking
    if (
      userPermissions.includes(Permission.MANAGE_BOOKINGS) ||
      (userPermissions.includes(Permission.MANAGE_OWN_BOOKINGS) &&
        booking.user.id === userId)
    ) {
      // Update the booking
      booking.updatedAt = new Date();
      booking.end = new Date();
      return await this.bookingRepository.save(booking);
    } else {
      throw new UnauthorizedError(
        'User does not have permission to end booking',
      );
    }
  }

  async findAll(userId: number): Promise<Booking[]> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    const userPermissions = await this.userService.getUserPermissions(userId);

    if (userPermissions.includes(Permission.MANAGE_BOOKINGS)) {
      return await this.bookingRepository.find({ relations: ['spot', 'user'] });
    } else if (userPermissions.includes(Permission.MANAGE_OWN_BOOKINGS)) {
      return await this.bookingRepository.find({
        where: { user },
        relations: ['spot', 'user'],
      });
    } else {
      throw new UnauthorizedError(
        'User does not have permission to view bookings',
      );
    }
  }

  async findOne(bookingId: number, userId: number) {
    // Find the user
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['spot', 'user'],
    });

    if (!booking) {
      throw new EntityNotFoundError('Booking', bookingId);
    }

    const userPermissions = await this.userService.getUserPermissions(userId);

    // Check if the user is authorized to view the booking
    if (
      userPermissions.includes(Permission.MANAGE_BOOKINGS) ||
      (userPermissions.includes(Permission.MANAGE_OWN_BOOKINGS) &&
        booking.user.id === userId)
    ) {
      return booking;
    } else {
      throw new UnauthorizedError(
        'User does not have permission to view booking',
      );
    }
  }

  async remove(bookingId: number, userId: number) {
    // Find the booking
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['spot', 'user'],
    });

    // Check if the booking exists
    if (!booking) {
      throw new EntityNotFoundError('Booking', bookingId);
    }

    const userPermissions = await this.userService.getUserPermissions(userId);

    // Check if the user is authorized to end the booking
    if (
      userPermissions.includes(Permission.MANAGE_BOOKINGS) ||
      (userPermissions.includes(Permission.MANAGE_OWN_BOOKINGS) &&
        booking.user.id === userId)
    ) {
      return await this.bookingRepository.remove(booking);
    } else {
      throw new UnauthorizedError(
        'User does not have permission to delete booking',
      );
    }
  }
}
