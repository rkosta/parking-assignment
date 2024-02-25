import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
