import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * The UsersService class is a service that interacts with a repository to create and retrieve User
 * objects.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * The create function takes a CreateUserDto object and uses it to create a new user using the
   * userRepository.
   * @param {CreateUserDto} createUserDto - The `createUserDto` parameter is of type `CreateUserDto`,
   * which is a Data Transfer Object (DTO) used to transfer data when creating a user. It likely
   * contains properties such as `firstName`, `lastName`, `email`, and `isAdmin`, which are used to
   * create a new user in the `userRepository`.
   * @returns The `create` function is returning a Promise that resolves to a `User` object after
   * saving the user with the provided data in the `userRepository`.
   */
  async create(user: User): Promise<User> {
    console.log(user);
    return this.userRepository.save(user);
  }

  /**
   * This async function returns all users from the user repository as a Promise of User array.
   * @returns An array of `User` objects is being returned.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * This async function returns a single user from the user repository by its id.
   * @param {number} id - The `id` parameter is a number that represents the id of a user.
   * @returns A `User` object is being returned.
   */
  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * This async function returns a single user from the user repository by its email.
   * @param {string} email - The `email` parameter is a string that represents the email of a user.
   * @returns A `User` object is being returned.
   */
  async findOneByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ token });
  }

  /**
   * This async function updates a user in the user repository by its id and returns the updated user.
   * @param {number} id - The `id` parameter is a number that represents the id of a user.
   * @param {Partial<User>} user - The `user` parameter is a partial object of type `User` that contains
   * the properties to be updated.
   * @returns A `User` object is being returned.
   */
  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      return null;
    }
    return this.userRepository.save({ ...userToUpdate, ...user });
  }
}
