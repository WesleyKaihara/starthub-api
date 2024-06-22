import { Sequelize } from 'sequelize-typescript';

import ProjectModel from '@project/shared/persistence/model/ProjectModel';
import UserModel from '@identity/shared/persistence/model/user.model';
import DiscussionModel from '@src/module/discussion/shared/persistence/model/DiscussionModel';
import InteractionModel from '@src/module/discussion/shared/persistence/model/InteractionModel';
import AnalysisHistoryModel from '@analysis/shared/persistence/model/analysisHistory.model';

export const sequelizeProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    sequelize.addModels([
      // Identity
      UserModel,
      // Discussion
      DiscussionModel,
      InteractionModel,
      // Project
      // LeanCanvasModel,
      ProjectModel,
      // RatingTopicModel,
      // UserRatingTopicModel,
      // ProjectVerticalModel,
      // Product
      //ProductModel,
      AnalysisHistoryModel,
    ]);

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }

    return sequelize;
  },
};
