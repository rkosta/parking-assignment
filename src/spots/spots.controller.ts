import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dtos/create-spot.dto';
import { IdSpotDto } from './dtos/id-spot.dto';
import { plainToClass } from 'class-transformer';
import { SpotDto } from './dtos/spot-dto';
import { UpdateSpotDto } from './dtos/update-spot.dto';

@Controller('spots')
/* The SpotsController class in TypeScript defines methods for retrieving all spots and creating a new
spot using a SpotsService. */
export class SpotsController {
  /**
   * The constructor function takes in a SpotsService instance as a parameter and assigns it to a
   * private readonly property.
   * @param {SpotsService} spotsService - The `spotsService` parameter is a private and readonly
   * property that is of type `SpotsService`. This parameter likely represents a service or class that
   * provides functionality related to spots or locations.
   */
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  /**
   * The `getAllSpots` function returns all spots by calling the `findAll` method of the
   * `spotsService`.
   * @returns The `getAllSpots()` function is returning the result of calling the `findAll()` method on
   * the `spotsService` object.
   */
  async getAllSpots() {
    return (await this.spotsService.findAll()).map((spot) =>
      plainToClass(SpotDto, spot, { excludeExtraneousValues: true }),
    );
  }

  @Post()
  /**
   * The createSpot function takes a CreateSpotDto object from the request body and uses it to create a
   * new spot using the spotsService.
   * @param {CreateSpotDto} createSpotDto - The `createSpotDto` parameter is of type `CreateSpotDto`,
   * which is a Data Transfer Object (DTO) used to transfer data when creating a spot. It likely
   * contains properties such as `name`, which is used to create a new spot in the `spotsService`.
   * @returns The `createSpot` function is returning the result of calling the `create` method of the
   * `spotsService` with the `name` property from the `createSpotDto` object as an argument.
   */
  createSpot(@Body() createSpotDto: CreateSpotDto) {
    return this.spotsService.create(createSpotDto.name);
  }

  @Get(':id')

  /**
   * This TypeScript function retrieves a spot by its ID and returns a DTO representation of it,
   * handling the case where the spot is not found.
   * @param {number} id - The `id` parameter is a number that is passed to the `getSpot` method as a
   * route parameter. It is parsed as an integer using the `ParseIntPipe` class to ensure that it is a
   * valid integer value. This method then uses the `id` to retrieve a specific spot
   * @returns The `getSpot` method is returning a `SpotDto` object after fetching the spot data from
   * the `spotsService` using the provided `id`. If the spot is not found, a `NotFoundException` is
   * thrown with a message indicating that the spot with the given id was not found. The returned
   * `SpotDto` object is created using the `plainToClass` function with the `exclude
   */
  async getSpot(@Param('id', ParseIntPipe) id: number) {
    const spot = await this.spotsService.findOne(id);
    if (!spot) {
      throw new NotFoundException(`Spot with id ${id} not found`);
    }
    return plainToClass(SpotDto, spot, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  /**
   * This TypeScript function updates a spot with the specified ID using data from the provided DTO and
   * returns the updated spot in a specific format.
   * @param {number} id - The `id` parameter is a number that is parsed from the request URL using the
   * `ParseIntPipe`. It is used to identify the specific spot that needs to be updated in the database.
   * @param {UpdateSpotDto} updateSpotDto - The `updateSpotDto` parameter in your code snippet likely
   * represents a Data Transfer Object (DTO) used for updating a spot. It contains the data necessary
   * to update a spot, such as the new name of the spot.
   * @returns The code snippet is returning a SpotDto object after updating a spot with the provided id
   * and name in the spotsService. If the spot is not found, a NotFoundException is thrown with a
   * message indicating that the spot with the given id was not found. The returned SpotDto object is
   * created using the plainToClass function with the spot data and excluding any extraneous values.
   */
  async updateSpot(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    const spot = await this.spotsService.updateSpot(id, updateSpotDto.name);
    if (!spot) {
      throw new NotFoundException(`Spot with id ${id} not found`);
    }
    return plainToClass(SpotDto, spot, { excludeExtraneousValues: true });
  }
}
