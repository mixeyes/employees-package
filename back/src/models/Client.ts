import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  // eslint-disable-next-line node/no-extraneous-import
} from 'sequelize-typescript';
import { Token } from './Token';

@Table
export class Client extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  public id!: string;
  @Column public clientSecret!: string;
  @Column({
    type: DataType.STRING,
  })
  public name!: string;
  @Column public redirectUris!: string;
  @Column({ type: DataType.ARRAY(DataType.STRING) }) public grants!: string[];
  @HasOne(() => Token, 'id') public token!: string;
}
