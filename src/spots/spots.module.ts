import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
