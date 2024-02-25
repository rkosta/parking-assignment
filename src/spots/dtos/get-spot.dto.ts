import { IsNumberString } from 'class-validator';

/* The GetSpotDto class in TypeScript contains a property "id" that should be a number represented as a
string. */
export class GetSpotDto {
  @IsNumberString()
  /* In the `GetSpotDto` class in TypeScript, the line `id: number;` is defining a property named `id`
  of type `number`. This property represents the unique identifier of a spot, but it is expected to
  be provided as a string that represents a number. */
  id: number;
}
