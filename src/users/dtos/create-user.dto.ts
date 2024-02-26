import { IsNotEmpty, MinLength } from 'class-validator';

/* The class `CreateUserDto` defines properties for creating a user with required fields for first
name, last name, email, and token, along with an optional isAdmin flag. */
export class CreateUserDto {
  @IsNotEmpty()
  /* In the `CreateUserDto` class, `firstName: string;` is defining a property named `firstName` of
  type `string`. This property is required for creating a user as indicated by the `@IsNotEmpty()`
  decorator above it. This means that when creating a new user object using this DTO (Data Transfer
  Object), the `firstName` field must be provided and cannot be empty. */
  firstName: string;
  @IsNotEmpty()
  /* In the `CreateUserDto` class, the line `lastName: string;` is defining a property named `lastName`
  of type `string`. This property is required for creating a user as indicated by the
  `@IsNotEmpty()` decorator above it. This means that when creating a new user object using this DTO
  (Data Transfer Object), the `lastName` field must be provided and cannot be empty. */
  lastName: string;
  @IsNotEmpty()
  /* In the `CreateUserDto` class, the line `email: string;` is defining a property named `email` of
  type `string`. This property is required for creating a user as indicated by the `@IsNotEmpty()`
  decorator above it. This means that when creating a new user object using this DTO (Data Transfer
  Object), the `email` field must be provided and cannot be empty. */
  email: string;
  @IsNotEmpty()
  /* In the `CreateUserDto` class, the line `token: string;` is defining a property named `token` of
  type `string`. This property is required for creating a user, as indicated by the `@IsNotEmpty()`
  decorator above it. This means that when creating a new user object using this DTO (Data Transfer
  Object), the `token` field must be provided and cannot be empty. */
  token: string;
  /* The line `isAdmin: boolean;` in the `CreateUserDto` class is defining a property named `isAdmin`
  of type `boolean`. This property is not marked with any validation decorators like
  `@IsNotEmpty()`, which means it is optional when creating a user object using this DTO. */
  isAdmin: boolean;
}
