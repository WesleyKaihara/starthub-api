import ProjectModel from '@project/shared/persistence/model/ProjectModel';
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
  tableName: 'discussion',
})
export default class DiscussionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  context: string;

  @ForeignKey(() => ProjectModel)
  @Column({ field: 'projectId', type: DataType.BIGINT })
  projectId: number;

  @BelongsTo(() => ProjectModel)
  project: ProjectModel;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
