import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';

@Injectable()
/* The SpotsService class in TypeScript is a service that interacts with a repository to create and
retrieve Spot objects. */
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private spotsRepository: Repository<Spot>,
  ) {}

  /**
   * The function creates a new Spot entity with the given name and saves it using a repository.
   * @param {string} name - The `name` parameter is a string that represents the name of a spot.
   * @returns The `create` function is returning a Promise that resolves to a `Spot` object after
   * saving the spot with the provided name in the `spotsRepository`.
   */
  async create(name: string): Promise<Spot> {
    const spot = this.spotsRepository.create({ name });
    return this.spotsRepository.save(spot);
  }

  /**
   * This async function returns all spots from the spots repository as a Promise of Spot array.
   * @returns An array of `Spot` objects is being returned.
   */
  async findAll(): Promise<Spot[]> {
    return this.spotsRepository.find();
  }

  /**
   * This async function returns a single spot from the spots repository by its id.
   * @param {number} id - The `id` parameter is a number that represents the id of a spot.
   * @returns A `Spot` object is being returned.
   */
  async findOne(id: number): Promise<Spot> {
    return this.spotsRepository.findOne({ where: { id } });
  }

  /**
   * This async function updates a spot in the spots repository by its id and returns the updated spot.
   * @param {number} id - The `id` parameter is a number that represents the id of a spot.
   * @param {string} name - The `name` parameter is a string that represents the name of a spot.
   * @returns A `Spot` object is being returned.
   */
  async updateSpot(id: number, name: string): Promise<Spot> {
    const spot = await this.spotsRepository.findOne({ where: { id } });
    if (!spot) {
      return null;
    }
    spot.name = name;
    return this.spotsRepository.save(spot);
  }
}
