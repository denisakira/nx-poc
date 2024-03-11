import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Company {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false })
  logoBlobUrl: string;

  @RelationId((company: Company) => company.user)
  userId: string;

  @OneToOne(() => User)
  user: User;
}

@Entity()
export class CompanyHistory {}

export class CompanyCreateDto {
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logoBlobUrl: string;
}

export class CompanyEditDto extends CompanyCreateDto {
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  id: string;
}
