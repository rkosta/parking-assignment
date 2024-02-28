import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Patch,
  ParseFloatPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dt';

@Controller('users')
/* The UsersController class in TypeScript defines methods for creating, retrieving, and transforming
user data using a UsersService. */
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = plainToClass(User, createUserDto);
    return await this.userService.create(user);
  }

  /**
   * The function getAllUsers asynchronously retrieves all users from a service, maps them to UserDto
   * objects, and returns the transformed user data.
   * @returns The `getAllUsers` function is returning an array of `UserDto` objects. Each `UserDto`
   * object is created by mapping over the `users` array obtained from `this.userService.findAll()`,
   * converting each user object to a plain object using `instanceToPlain`, and then creating a new
   * `UserDto` instance using `plainToClass`. The `excludeExtraneousValues` option
   */
  @Get()
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
   * The `getUser` function retrieves a user by ID from the database and throws a NotFoundException if
   * the user does not exist, returning a DTO representation of the user if found.
   * @param {number} id - The `id` parameter in the `getUser` function is a number type parameter that
   * represents the unique identifier of a user. This parameter is passed to the function to retrieve a
   * specific user from the database based on this identifier. The `ParseIntPipe` is used to ensure
   * that the `id`
   * @returns The `getUser` function is returning a `UserDto` object that is created using the
   * `plainToClass` function. This `UserDto` object is constructed based on the data retrieved from the
   * database for the user with the specified ID. The `excludeExtraneousValues: true` option ensures
   * that only the properties defined in the `UserDto` class are included in the returned object,
   */
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);

    // If the user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToClass(UserDto, instanceToPlain(user), {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  /**
   * The `updateUser` function updates a user in the database and throws a `NotFoundException` if the
   * user with the specified ID is not found.
   * @param {number} id - The `id` parameter in the `updateUser` function is a number that represents
   * the unique identifier of the user you want to update. This parameter is obtained from the route
   * URL as a request parameter. It is parsed using `ParseIntPipe` to ensure that it is converted to a
   * valid integer
   * @param {UpdateUserDto} updateUserDto - The `updateUserDto` parameter in the `updateUser` function
   * is of type `UpdateUserDto`. This parameter likely contains the data that needs to be updated for
   * the user with the specified ID. It could include fields such as name, email, or any other user
   * information that can be modified
   * @returns The `updateUser` method in the code snippet is returning a `UserDto` object after
   * updating the user information in the database. The `UserDto` object is created using the
   * `plainToClass` function from the class-transformer library, which transforms the retrieved user
   * object into a plain object of type `UserDto`. The `excludeExtraneousValues: true` option ensures
   * that only
   */
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);

    // If the user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToClass(UserDto, instanceToPlain(user), {
      excludeExtraneousValues: true,
    });
  }
}
