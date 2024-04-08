import { Sequelize } from 'sequelize-typescript';

import ProjectModel from '@project/shared/persistence/model/ProjectModel';
import ProjectVerticalModel from '@project/shared/persistence/model/ProjectVerticalModel';
import UserModel from '@identity/shared/persistence/model/user.model';
import UserAbilityModel from '@identity/shared/persistence/model/UserAbilityModel';
import RatingTopicModel from '@project/shared/persistence/model/RatingTopicModel';
import UserRatingTopicModel from '@project/shared/persistence/model/UserRatingTopicModel';

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
      UserAbilityModel,
      // Project
      ProjectModel,
      RatingTopicModel,
      UserRatingTopicModel,
      ProjectVerticalModel,
    ]);

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }

    return sequelize;
  },
};
