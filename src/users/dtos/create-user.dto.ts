import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/permissions/role.enum';

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

  /* In the `CreateUserDto` class, the line `role: Role;` is defining a property named `role` of type
  `Role`. This property is required for creating a user, as indicated by the `@IsNotEmpty()` decorator
  above it. This means that when creating a new user object using this DTO (Data Transfer Object), the
  `role` field must be provided and cannot be empty. The `@IsEnum(Role)` decorator above the `role`
  property specifies that the value of the `role` field must be one of the allowed values defined in
  the `Role` enum. */
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
