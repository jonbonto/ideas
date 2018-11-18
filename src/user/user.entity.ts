import { UserRO } from './user.dto';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IdeaEntity } from 'idea/idea.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'varchar',
    length: '100',
    unique: true
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => IdeaEntity, ideas => ideas.author)
  ideas: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true) {
    const { id, created, username, token } = this;
    const responseObject: UserRO = { id, created, username };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET,
      {expiresIn: '7d'}
    );
  }
}
