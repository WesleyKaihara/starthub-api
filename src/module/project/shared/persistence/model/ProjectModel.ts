import UserModel from '@identity/shared/persistence/model/user.model';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'project',
})
export default class ProjectModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  private: boolean;

  @ForeignKey(() => UserModel)
  @Column({ field: 'userId', type: DataType.BIGINT })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @Column
  image: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
