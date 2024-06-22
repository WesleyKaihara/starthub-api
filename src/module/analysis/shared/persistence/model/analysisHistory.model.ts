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
} from 'sequelize-typescript';

@Table({
  tableName: 'analysisHistory',
})
export default class AnalysisHistoryModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  request: string;

  @Column({
    type: DataType.TEXT,
  })
  result: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'userId', type: DataType.BIGINT })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;
}
