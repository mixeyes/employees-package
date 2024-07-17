import {
  Model,
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  HasOne,
  Index,
  // eslint-disable-next-line node/no-extraneous-import
} from 'sequelize-typescript';
import { Token } from './Token';
import { genSaltSync, hashSync } from 'bcrypt-nodejs';

@Table
export class User extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  public id!: string;

  @AllowNull
  @Unique
  @Index
  @Column
  public userName!: string;

  @AllowNull
  @Column
  public email!: string;

  @Column public password!: string;

  @HasOne(() => Token, 'id') public token: Token | undefined;
}

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      hashSync(user.password, genSaltSync());
  }
});
