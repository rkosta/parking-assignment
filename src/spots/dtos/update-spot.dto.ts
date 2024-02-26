import { IsNotEmpty, IsString } from 'class-validator';

/**
 * The UpdateSpotDto class in TypeScript defines a property "name" that must be a string.
 * @class
 * @property {string} name - The `name` property is of type `string` and represents the name of a spot.
 * It is used to update the name of a spot in the `spotsService`.
 */
export class UpdateSpotDto {
  @IsString()
  @IsNotEmpty()
  /* The line `name: string;` within the `UpdateSpotDto` class in TypeScript is defining a property
  named `name` of type `string`. This property is used to store the name of a spot and indicates
  that the `name` property must be a string type. It serves as a declaration of the property within
  the class, specifying that it will hold string values. */
  name: string;
}
