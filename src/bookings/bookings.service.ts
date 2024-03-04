import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Spot } from 'src/spots/spot.entity';
import { User } from 'src/users/user.entity';
import { UnauthorizedError } from 'src/common/errors/unauthorized.error';
import { Role } from 'src/permissions/role.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBooking(spotId: number, userId: number) {
    // Find the spot and user
    const [spot, user] = await Promise.all([
      this.spotRepository.findOneBy({ id: spotId }),
      this.userRepository.findOneBy({ id: userId }),
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
    const [booking, user] = await Promise.all([
      this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['spot', 'user'],
      }),
      this.userRepository.findOneBy({ id: userId }),
    ]);
    // Check if the booking exists
    if (!booking) {
      throw new EntityNotFoundError('Booking', bookingId);
    }

    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    // check if the booking already ended
    if (booking.end) {
      throw new Error('Booking already ended');
    }

    // Check if the user is authorized to end the booking
    if (booking.user.id === userId || user.role === Role.ADMIN) {
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
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    if (user.role === Role.ADMIN) {
      return await this.bookingRepository.find({ relations: ['spot', 'user'] });
    } else {
      return await this.bookingRepository.find({
        where: { user },
        relations: ['spot', 'user'],
      });
    }
  }

  async findOne(bookingId: number, userId: number) {
    // Find the user
    const user = await this.userRepository.findOneBy({ id: userId });
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

    // Check if the user is authorized to view the booking
    if (user.role === Role.ADMIN || booking.user.id === userId) {
      return booking;
    } else {
      throw new UnauthorizedError(
        'User does not have permission to view booking',
      );
    }
  }

  async remove(bookingId: number, userId: number) {
    // Find the booking and user
    const [booking, user] = await Promise.all([
      this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['spot', 'user'],
      }),
      this.userRepository.findOneBy({ id: userId }),
    ]);

    // Check if the booking exists
    if (!booking) {
      throw new EntityNotFoundError('Booking', bookingId);
    }

    if (!user) {
      throw new EntityNotFoundError('User', userId);
    }

    // Check if the user is authorized to end the booking
    if (booking.user.id === userId || user.role === Role.ADMIN) {
      return await this.bookingRepository.remove(booking);
    } else {
      throw new UnauthorizedError(
        'User does not have permission to delete booking',
      );
    }
  }
}
