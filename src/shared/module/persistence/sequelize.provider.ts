import { Sequelize } from 'sequelize-typescript';

import UserRoleModel from '@identity/shared/persistence/model/user-role.model';
import ProjectModel from '@project/shared/persistence/model/ProjectModel';
import ProjectVerticalModel from '@project/shared/persistence/model/ProjectVerticalModel';
import UserModel from '@identity/shared/persistence/model/user.model';

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
    sequelize.addModels([UserModel, UserRoleModel, ProjectModel, ProjectVerticalModel]);

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }

    return sequelize;
  },
};
