import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Min,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import ProjectModel from './ProjectModel';
import UserModel from '@identity/shared/persistence/model/user.model';
import RatingTopicModel from './RatingTopicModel';

@Table({
  tableName: 'userRatingTopic',
})
export default class UserRatingTopicModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Min(1)
  @Column
  value: number;

  @ForeignKey(() => UserModel)
  @Column({ field: 'userId', type: DataType.BIGINT })
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @ForeignKey(() => ProjectModel)
  @Column({ field: 'projectId', type: DataType.BIGINT })
  projectId!: number;

  @BelongsTo(() => ProjectModel)
  project!: ProjectModel;

  @ForeignKey(() => RatingTopicModel)
  @Column({ field: 'ratingTopicId', type: DataType.BIGINT })
  ratingTopicId!: number;

  @BelongsTo(() => RatingTopicModel)
  ratingTopic!: RatingTopicModel;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
