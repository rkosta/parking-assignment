import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { classToPlain, instanceToPlain, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { GetUserDto } from './dtos/get-user.dto';

@Controller('users')
/* The UsersController class in TypeScript defines methods for creating, retrieving, and transforming
user data using a UsersService. */
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  /**
   * The function creates a new user by converting the data from the request body into a User object
   * and then passing it to the userService for creation.
   * @param {CreateUserDto} createUserDto - The `createUserDto` parameter in the `create` method is of
   * type `CreateUserDto`. It is being received from the request body and is used to create a new
   * `User` object by converting it using `plainToClass`. This `User` object is then passed to the `
   * @returns The `create` method is returning the result of the `userService.create(user)` method
   * call, which is likely a Promise representing the creation of a new user based on the data provided
   * in the `createUserDto`.
   */
  async create(@Body() createUserDto: CreateUserDto) {
    const user = plainToClass(User, createUserDto);
    return await this.userService.create(user);
  }

  @Get()
  /**
   * The function getAllUsers asynchronously retrieves all users from a service, maps them to UserDto
   * objects, and returns the transformed user data.
   * @returns The `getAllUsers` function is returning an array of `UserDto` objects. Each `UserDto`
   * object is created by mapping over the `users` array obtained from `this.userService.findAll()`,
   * converting each user object to a plain object using `instanceToPlain`, and then creating a new
   * `UserDto` instance using `plainToClass`. The `excludeExtraneousValues` option
   */
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map((user) => {
      const userDto = plainToClass(UserDto, instanceToPlain(user), {
        excludeExtraneousValues: true,
      });
      return userDto;
    });
  }

  @Get(':id')
  /**
   * This TypeScript function retrieves a user by ID and returns a DTO representation of the user with
   * certain values excluded.
   * @param {GetUserDto} idParam - The `idParam` parameter in the `getUser` function is of type
   * `GetUserDto`, which likely contains a single property `id`. This parameter is used to fetch a user
   * from the database using the `id` provided in the `idParam`. If the user is not found, a
   * @returns An instance of the `UserDto` class is being returned after converting the `user` object
   * to a plain object using `instanceToPlain` and then transforming it to an instance of `UserDto`
   * with the specified options.
   */
  async getUser(@Param() idParam: GetUserDto) {
    const user = await this.userService.findOneById(idParam.id);

    /* The `if (!user) {` statement in the `getUser` function is checking if the `user` object
    retrieved from the database is falsy, which typically means that no user was found with the
    provided ID. If the `user` object is falsy (i.e., `null`, `undefined`, `0`, `false`, etc.), it
    means that the user with the specified ID does not exist in the database. */
    if (!user) {
      throw new NotFoundException(`User with id ${idParam.id} not found`);
    }

    return plainToClass(UserDto, instanceToPlain(user), {
      excludeExtraneousValues: true,
    });
  }
}
