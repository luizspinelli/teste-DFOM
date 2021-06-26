import {
  Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn
} from 'typeorm';

@Entity('products')
class Product {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  favorite: boolean = false;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Product };
