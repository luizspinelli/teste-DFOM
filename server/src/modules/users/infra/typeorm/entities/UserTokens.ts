import {
  Column, CreateDateColumn, Entity, Generated, ObjectID, ObjectIdColumn, UpdateDateColumn
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @ObjectIdColumn('')
  id: ObjectID;

  @Column()
  @Generated()
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { UserToken };
