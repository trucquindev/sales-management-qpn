/* eslint-disable no-console */

import express from 'express';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
const bodyParser = require('body-parser');
import cors from 'cors';
import { APIs_V1 } from './routes/v1';

const START_SERVER = () => {
  const xmlParser = bodyParser.text({ type: 'application/xml' });
  const app = express();
  app.use(cors());
  // Cấu hình middleware
  app.use(xmlParser);
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  app.use('/', APIs_V1);
  app.use(errorHandlingMiddleware);
  if (env.BUILD_MODE === 'prod') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Production. Hello ${env.AUTHOR}, I'm running at Port: ${process.env.PORT}`
      );
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello ${env.AUTHOR}, I'm running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      );
    });
  }

  //thực hiện clean up trước khi đóng connect database
  exitHook(async () => {
    CLOSE_DB();
    console.log('MongoDB connection closed');
  });
};
//dùng IIFE - Anonymous Async Functions
// connect database thành công rồi mới start server back-end
(async () => {
  try {
    await CONNECT_DB();
    console.log('Connected to MongoDB successfully');
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
