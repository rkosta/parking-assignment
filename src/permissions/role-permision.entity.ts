import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from './role.enum';
import { Permission } from './permission.enum';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: Role })
  role: Role;

  @Column('enum', { enum: Permission })
  permission: Permission;
}
