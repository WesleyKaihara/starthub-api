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

  @Column
  message: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
