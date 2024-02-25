import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dtos/create-spot.dto';
import { GetSpotDto } from './dtos/get-spot.dto';

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
  getAllSpots() {
    return this.spotsService.findAll();
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
   * This function retrieves a spot using the ID provided in the GetSpotDto parameter.
   * @param {GetSpotDto} idParam - The `idParam` parameter is of type `GetSpotDto`, which likely
   * contains the `id` property used to retrieve a specific spot from the `spotsService` by calling the
   * `findOne` method with the `idParam.id` as the argument.
   * @returns The `findOne` method from the `spotsService` is being called with the `id` property of
   * the `idParam` object as the argument, and the result of this method call is being returned.
   */
  getSpot(@Param() idParam: GetSpotDto) {
    return this.spotsService.findOne(idParam.id);
  }
}
