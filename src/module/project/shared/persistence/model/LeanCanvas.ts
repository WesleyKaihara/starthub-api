import {
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
import ProjectModel from './ProjectModel';

@Table({
  tableName: 'leanCanvas',
})
export default class LeanCanvasModel extends Model {
  @PrimaryKey
  @ForeignKey(() => ProjectModel)
  @Column({ field: 'projectId', type: DataType.BIGINT })
  projectId!: number;

  @BelongsTo(() => ProjectModel)
  project!: ProjectModel;

  @Column({
    type: DataType.TEXT,
  })
  problem: string;

  @Column({
    type: DataType.TEXT,
  })
  customerSegments: string;

  @Column({
    type: DataType.TEXT,
  })
  uniqueValueProposition: string;

  @Column({
    type: DataType.TEXT,
  })
  solution: string;

  @Column({
    type: DataType.TEXT,
  })
  channels: string;

  @Column({
    type: DataType.TEXT,
  })
  revenueStreams: string;

  @Column({
    type: DataType.TEXT,
  })
  costStructure: string;

  @Column({
    type: DataType.TEXT,
  })
  keyMetrics: string;

  @Column({
    type: DataType.TEXT,
  })
  unfairAdvantage: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
