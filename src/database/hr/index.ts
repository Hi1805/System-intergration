import { Sequelize } from 'sequelize';
import { initModels } from './models/init-models';

const sequelize = new Sequelize('HR', 'sa', 'huy12345', {
  host: 'localhost',
  dialect: 'mssql',
  port: 1433,
});
const hrModel = initModels(sequelize);
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection has been established successfully. --- connected to HR'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { hrModel };
