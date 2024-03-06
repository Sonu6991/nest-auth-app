import { UserRole } from 'src/common/enum/user-role.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', array: true, default: '{}', enum: UserRole })
  roles: string[];
}
