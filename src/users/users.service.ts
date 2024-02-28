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
   * The create function in TypeScript excludes the id from the user object before saving it to the
   * repository.
   * @param {User} user - The `create` function you provided takes a `User` object as a parameter. The
   * function then extracts the `id` property from the `User` object and creates a new user object
   * without the `id` property. Finally, it saves the new user object using the `userRepository` and
   * returns
   * @returns The `create` function is returning a Promise that resolves to a new User object after
   * excluding the `id` property from the input `user` object, creating a new user entity in the
   * repository with the remaining properties, and saving the new user entity in the repository.
   */
  async create(user: User): Promise<User> {
    // make sure to exclude the id from the user object
    const { id, ...otherProps } = user;
    const newUser = this.userRepository.create(otherProps);
    return this.userRepository.save(newUser);
  }

  /**
   * This async function returns all users from the user repository as a Promise of User array.
   * @returns An array of `User` objects is being returned.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * This async function returns a single user from the user repository by its id.
   * @param {number} id - The `id` parameter is a number that represents the id of a user.
   * @returns A `User` object is being returned.
   */
  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
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
