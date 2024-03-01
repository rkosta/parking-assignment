import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dt';
import { AdminGuard } from 'src/guards/admin-guard';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiHeader({
  name: 'Authorization',
  description: 'The token we need for authorization',
})
@Controller('users')
/* The UsersController class in TypeScript defines methods for creating, retrieving, and transforming
user data using a UsersService. */
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'Create a new user',
    type: UserDto,
  })
  @UseGuards(AdminGuard)
  @Post()
  @Serialize(UserDto)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = plainToClass(User, createUserDto);
    return await this.userService.create(user);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieve all users',
    type: UserDto,
    isArray: true,
  })
  @Get()
  @Serialize(UserDto)
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieve a user by id',
    type: UserDto,
  })
  @Get(':id')
  @Serialize(UserDto)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);

    // If the user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @ApiResponse({
    status: 200,
    description: 'Update a user by id',
    type: UserDto,
  })
  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);

    // If the user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
