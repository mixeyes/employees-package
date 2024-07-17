import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  // eslint-disable-next-line node/no-extraneous-import
} from 'sequelize-typescript';
import { User } from './User';
import { Client } from './Client';

@Table
export class Token extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  public id!: string;

  @Column public accessToken: string | undefined;
  @Column({ type: DataType.DATE })
  public accessTokenExpiresAt: string | undefined;
  @Column public refreshToken: string | undefined;
  @Column({ type: DataType.DATE })
  public refreshTokenExpiresAt: string | undefined;
  @ForeignKey(() => User) @Column public userId!: string;
  @ForeignKey(() => Client) public clientId!: string;
}
