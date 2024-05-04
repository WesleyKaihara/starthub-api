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
import DiscussionModel from './DiscussionModel';
import UserModel from '@identity/shared/persistence/model/user.model';

@Table({
  tableName: 'interaction',
})
export default class InteractionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => DiscussionModel)
  @Column({ field: 'discussionId', type: DataType.BIGINT })
  discussionId!: number;

  @BelongsTo(() => DiscussionModel)
  discussion!: DiscussionModel;

  @ForeignKey(() => UserModel)
  @Column({ field: 'userId', type: DataType.BIGINT })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @Column({
    type: DataType.TEXT,
  })
  @Column
  message: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
