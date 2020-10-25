import mongoose from 'mongoose';
import bluebird from 'bluebird';
import logger from './logger';
import { mongo } from './vars';

const connectDatabase = () => {
  logger.info(`Connecting to ${mongo.uri}`);
  mongoose.Promise = bluebird;
  mongoose
    .connect(mongo.uri, {
      useNewUrlParser: true,
      keepAlive: 1,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      logger.info('Successfully connected to the database');
    })
    .catch((error) => {
      logger.error(
        `Could not connect to the database. Exiting now...\n${error}`,
      );
      process.exit(-1);
    });
};

export default connectDatabase;
