import { Booking } from 'src/bookings/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
/* The class `Spot` defines properties for an entity with an auto-generated `id` and a `name` field. */
export class Spot {
  @PrimaryGeneratedColumn()
  /* The line `id: number;` in the `Spot` class is defining a property named `id` with a type
  annotation of `number`. This property is used to store the unique identifier for each instance of
  the `Spot` entity. The `@PrimaryGeneratedColumn()` decorator above the `id` property indicates
  that this field will be auto-generated by the database system, typically as a primary key. */
  id: number;

  @Column({
    unique: true,
  })
  /* The line `name: string;` in the `Spot` class is defining a property named `name` with a type
  annotation of `string`. This property is used to store the name of each instance of the `Spot`
  entity. The `@Column()` decorator above the `name` property indicates that this field will be
  mapped to a column in the database table where the entity is stored. The `string` type annotation
  specifies that the `name` property can only hold string values. */
  name: string;

  /* The `@OneToMany` decorator above the `bookings` property specifies the relationship between the
  `Spot` entity and the `Booking` entity. This relationship indicates that a `Spot` entity can have
  multiple `Booking` entities associated with it. The `@OneToMany` decorator takes two arguments: a
  function that returns the related entity class and a function that returns the related entity's
  property. */
  @OneToMany(() => Booking, (booking) => booking.spot)
  /* The line `bookings: Booking[];` in the `Spot` class is defining a property named `bookings` with
  a type annotation of `Booking[]`. This property is used to store an array of `Booking` entities
  associated with each instance of the `Spot` entity. */
  bookings: Booking[];
}
