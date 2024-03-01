import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/* The SpotDto class in TypeScript includes properties for id and name, both of which are annotated
with the @Expose() decorator. */
export class SpotDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the spot',
    type: 'number',
  })
  @Expose()
  /* The line `id: number;` in the SpotDto class is defining a property named `id` with a type of
  `number`. This means that instances of the SpotDto class will have a property called `id` that can
  store numerical values. The `@Expose()` decorator is used to indicate that this property should be
  included when the class is serialized or transformed. */
  id: number;

  @ApiProperty({
    example: 'Spot 1',
    description: 'The name of the spot',
    type: 'string',
  })
  @Expose()
  /* The line `name: string;` in the SpotDto class is defining a property named `name` with a type of
  `string`. This means that instances of the SpotDto class will have a property called `name` that
  can store string values. The `@Expose()` decorator is used to indicate that this property should
  be included when the class is serialized or transformed. */
  name: string;
}
