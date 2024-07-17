// eslint-disable-next-line node/no-extraneous-import
import { Sequelize } from 'sequelize-typescript';

// const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

const sequelize = new Sequelize(`postgres://postgres:employees@localhost:5432/db`, { dialect: 'postgres' });

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.addModels([__dirname + '/models']);

module.exports = sequelize;
