import { Sequelize } from 'sequelize';
import { mySQLConfig } from './config';
import { initModels } from './models/init-models';

export const sequelize = new Sequelize({
  host: mySQLConfig.host,
  port: +mySQLConfig.port,
  username: mySQLConfig.user,
  password: mySQLConfig.password,
  database: mySQLConfig.database,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
  },
});

console.log(mySQLConfig);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const mainModel = initModels(sequelize);
export { mainModel };
