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
  UseGuards,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dtos/create-spot.dto';
import { SpotDto } from './dtos/spot-dto';
import { UpdateSpotDto } from './dtos/update-spot.dto';
import { AdminGuard } from 'src/guards/admin-guard';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('spots')
@ApiHeader({
  name: 'Authorization',
  description: 'The token we need for authorization',
})
@Controller('spots')
/* The SpotsController class in TypeScript defines methods for retrieving all spots and creating a new
spot using a SpotsService. */
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  @Serialize(SpotDto)
  @ApiResponse({
    status: 200,
    description: 'Retrieve all spots',
    type: SpotDto,
    isArray: true,
  })
  async getAllSpots() {
    // Retrieve all spots
    return await this.spotsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  @Serialize(SpotDto)
  @ApiResponse({
    status: 201,
    description: 'Create a new spot',
    type: SpotDto,
  })
  createSpot(@Body() createSpotDto: CreateSpotDto) {
    // Create a new spot with the given name
    return this.spotsService.create(createSpotDto.name);
  }

  @Get(':id')
  @Serialize(SpotDto)
  @ApiResponse({
    status: 200,
    description: 'Retrieve a spot by id',
    type: SpotDto,
  })
  async getSpot(@Param('id', ParseIntPipe) id: number) {
    // Find the spot with the given id
    const spot = await this.spotsService.findOne(id);
    // If the spot is not found, throw a NotFoundException
    if (!spot) {
      throw new NotFoundException(`Spot with id ${id} not found`);
    }
    return spot;
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @Serialize(SpotDto)
  @ApiResponse({
    status: 200,
    description: 'Update a spot by id',
    type: SpotDto,
  })
  async updateSpot(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    // Update the spot with the given id
    const spot = await this.spotsService.updateSpot(id, updateSpotDto.name);
    // If the spot is not found, throw a NotFoundException
    if (!spot) {
      throw new NotFoundException(`Spot with id ${id} not found`);
    }
    return spot;
  }
}
