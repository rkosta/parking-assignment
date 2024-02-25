import { IsString, MinLength, min } from 'class-validator';

/* The class `CreateSpotDto` in TypeScript defines a property `name` that must be a string with a
minimum length of 3 characters. */
export class CreateSpotDto {
  @IsString()
  @MinLength(3, { message: 'Name is too short' })
  /* In the `CreateSpotDto` class in TypeScript, `name: string;` is defining a property named `name` of
  type `string`. This property is used to store the name of a spot and must be a string with a
  minimum length of 3 characters based on the validation decorators `@IsString()` and
  `@MinLength(3)`. */
  name: string;
}
