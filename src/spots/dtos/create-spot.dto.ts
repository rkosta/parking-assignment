import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/* The class `CreateSpotDto` in TypeScript defines a property `name` that must be a string with a
minimum length of 3 characters. */

export class CreateSpotDto {
  @ApiProperty({
    description: 'The name of the spot',
    example: 'Spot 1',
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  /* The line `name: string;` within the `CreateSpotDto` class in TypeScript is defining a property
  named `name` of type `string`. This property is used to store the name of a spot and indicates
  that the `name` property must be a string type. It serves as a declaration of the property within
  the class, specifying that it will hold string values. */
  name: string;
}
