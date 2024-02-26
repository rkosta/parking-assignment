import { Exclude, Expose } from 'class-transformer';

/* The UserDto class defines properties for a user's first name, last name, email, and admin status,
with token excluded. */
export class UserDto {
  @Expose()
  /* The line `firstName: string;` in the `UserDto` class is defining a property named `firstName` with
  a type of `string`. This property represents the first name of a user in the data transfer object
  (DTO) structure. The `@Expose()` decorator above the property indicates that this property should
  be included when serializing the object, while the `@Exclude()` decorator is used to exclude the
  `token` property from serialization. */
  firstName: string;
  @Expose()
  /* The line `lastName: string;` in the `UserDto` class is defining a property named `lastName` with a
  type of `string`. This property represents the last name of a user in the data transfer object
  (DTO) structure. The `@Expose()` decorator above the property indicates that this property should
  be included when serializing the object. */
  lastName: string;
  @Expose()

  /* The line `email: string;` in the `UserDto` class is defining a property named `email` with a type
  of `string`. This property represents the email address of a user in the data transfer object
  (DTO) structure. The `@Expose()` decorator above the property indicates that this property should
  be included when serializing the object, meaning it will be part of the output when converting the
  object to a JSON representation. */
  email: string;
  @Expose()
  /* The line `isAdmin: boolean;` in the `UserDto` class is defining a property named `isAdmin` with a
  type of `boolean`. This property represents the admin status of a user in the data transfer object
  (DTO) structure. */
  isAdmin: boolean;
  @Exclude()
  /* The line `token: string;` in the `UserDto` class is defining a property named `token` with a type
  of `string`. This property represents the token of a user in the data transfer object (DTO)
  structure. The `@Exclude()` decorator above the property indicates that this property should be
  excluded when serializing the object, meaning it will not be part of the output when converting the
  object to a JSON representation. */
  /* CONSIDERATION: I decided to remove from the serialization for security measures. */
  token: string;
}
