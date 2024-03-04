import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/permissions/role.enum';

/* The `UpdateUserDto` class defines properties for updating a user with optional fields for first
name, last name, email, token, and isAdmin. */
export class UpdateUserDto {
  /* The line `firstName: string;` in the `UpdateUserDto` class is defining a property named `firstName`
  of type `string`. This property is optional for updating a user as indicated by the `@IsOptional()`
  decorator above it. This means that when updating a user object using this DTO (Data Transfer Object),
  the `firstName` field is not required and can be omitted. */
  @IsOptional()
  firstName: string;

  /* The line `lastName: string;` in the `UpdateUserDto` class is defining a property named `lastName` of
  type `string`. This property is optional for updating a user as indicated by the `@IsOptional()`
  decorator above it. This means that when updating a user object using this DTO (Data Transfer Object),
  the `lastName` field is not required and can be omitted. */
  @IsOptional()
  lastName: string;

  /* The line `email: string;` in the `UpdateUserDto` class is defining a property named `email` of type
  `string`. This property is optional for updating a user as indicated by the `@IsOptional()` decorator
  above it. This means that when updating a user object using this DTO (Data Transfer Object), the
  `email` field is not required and can be omitted. */
  @IsOptional()
  email: string;

  /* The line `token: string;` in the `UpdateUserDto` class is defining a property named `token` of type
  `string`. This property is optional for updating a user as indicated by the `@IsOptional()` decorator
  above it. This means that when updating a user object using this DTO (Data Transfer Object), the
  `token` field is not required and can be omitted. */
  @IsOptional()
  token: string;
}
