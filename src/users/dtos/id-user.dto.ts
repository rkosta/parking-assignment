import { IsNumberString } from 'class-validator';

/* The `IdUserDto` class defines a property `id` of type number, with validation to ensure it is a
string containing only numbers. */
export class IdUserDto {
  @IsNumberString()
  /* The line `id: number;` in the `IdUserDto` class is defining a property named `id` with a type of
  `number`. This property is expected to hold a numerical value when an instance of `IdUserDto` is
  created. Additionally, the `@IsNumberString()` decorator above the `id` property indicates that
  the value of `id` should be a string containing only numbers. This decorator is used for
  validation purposes to ensure that the `id` property meets the specified criteria. */
  id: number;
}
