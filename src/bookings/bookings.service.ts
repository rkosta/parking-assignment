import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Spot } from 'src/spots/spot.entity';
import { User } from 'src/users/user.entity';

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
      throw new Error('Spot not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Create a new booking
    const newBooking = this.bookingRepository.create({
      start: new Date(),
      spot,
      user,
    });
    // Save the booking
    return await this.bookingRepository.save(newBooking);
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
      throw new Error('Booking not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // check if the booking already ended
    if (!booking.end) {
      throw new Error('Booking already ended');
    }

    // Check if the user is authorized to end the booking
    if (booking.user.id === userId || user.isAdmin) {
      // Update the booking
      booking.updatedAt = new Date();
      booking.end = new Date();
      return await this.bookingRepository.save(booking);
    } else {
      throw new Error('User not authorized');
    }
  }

  async findAll(userId: number): Promise<Booking[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isAdmin) {
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
      throw new Error('User not found');
    }

    // if the user is an admin, return the booking
    // if the user is not an admin, return the booking only if it belongs to the user
    if (user.isAdmin) {
      return await this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['spot', 'user'],
      });
    } else {
      return await this.bookingRepository.findOne({
        where: { id: bookingId, user },
        relations: ['spot', 'user'],
      });
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
      throw new Error('Booking not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is authorized to end the booking
    if (booking.user.id === userId || user.isAdmin) {
      return await this.bookingRepository.remove(booking);
    } else {
      throw new Error('User not authorized');
    }
  }
}
