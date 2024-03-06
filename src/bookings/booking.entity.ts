import { Spot } from '../spots/spot.entity';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// The `@Entity()` decorator above the `Booking` class indicates that the `Booking` class is an entity
// that should be stored in the database. The `@Entity()` decorator takes an optional argument that
// specifies the name of the database table where the entity should be stored. If no table name is
// provided, the name of the entity class will be used as the table name.
@Entity()
// The `Booking` class defines properties for a booking entity with fields for id, user, start, end, spot,
// createdAt, and updatedAt.
export class Booking {
  // The `@PrimaryGeneratedColumn()` decorator above the `id` property indicates that this field is the
  // primary key for the entity and its value will be automatically generated by the database system upon
  // insertion of a new record.
  @PrimaryGeneratedColumn()
  // The line `id: number;` in the `Booking` class is defining a property called `id` with a type
  // annotation of `number`. This property represents the unique identifier for each booking entity in the
  // database table.
  id: number;

  // The `@ManyToOne` decorator above the `user` property specifies the relationship between the `Booking`
  // entity and the `User` entity. This relationship indicates that a `Booking` entity is associated with
  // a single `User` entity. The `@ManyToOne` decorator takes two arguments: a function that returns the
  // related entity class and a function that returns the related entity's property.
  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  // The line `user: User;` in the `Booking` class is defining a property called `user` with a type
  // annotation of `User`. This property represents the user associated with a booking entity in the
  // database table.
  user: User;

  @Column({
    nullable: false,
  })
  // The line `start: Date;` in the `Booking` class is defining a property called `start` with a type
  // annotation of `Date`. This property represents the start date and time of a booking entity in the
  // database table.
  start: Date;

  @Column({
    nullable: true,
  })
  // The line `end: Date;` in the `Booking` class is defining a property called `end` with a type
  // annotation of `Date`. This property represents the end date and time of a booking entity in the
  // database table.
  end: Date;

  // The `@ManyToOne` decorator above the `spot` property specifies the relationship between the `Booking`
  // entity and the `Spot` entity. This relationship indicates that a `Booking` entity is associated with
  // a single `Spot` entity. The `@ManyToOne` decorator takes two arguments: a function that returns the
  // related entity class and a function that returns the related entity's property.
  @ManyToOne(() => Spot, (spot) => spot.bookings, { nullable: false })
  // The line `spot: Spot;` in the `Booking` class is defining a property called `spot` with a type
  // annotation of `Spot`. This property represents the spot associated with a booking entity in the
  // database table.
  spot: Spot;

  // The `@CreateDateColumn()` decorator above the `createdAt` property specifies that this field will be
  // automatically populated with the current timestamp when a new record is inserted into the database
  // table.
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  // The line `createdAt: Date;` in the `Booking` class is defining a property called `createdAt` with a
  // type annotation of `Date`. This property represents the date and time when a booking entity was
  // created in the database table.
  createdAt: Date;

  // The `@CreateDateColumn()` decorator above the `updatedAt` property specifies that this field will be
  // automatically populated with the current timestamp when a record is updated in the database table.
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  // The line `updatedAt: Date;` in the `Booking` class is defining a property called `updatedAt` with a
  // type annotation of `Date`. This property represents the date and time when a booking entity was last
  // updated in the database table.
  updatedAt: Date;
}
