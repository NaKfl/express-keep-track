import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import methodOverride from 'method-override';
import cors from 'cors';
import passport from 'passport';
import { logs } from './vars';
import routes from '../api/routes';
import strategies from './passport';
import * as error from '../api/middlewares/error';

const app = express();

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

app.use('/api', routes);

app.use(error.converter);

app.use(error.notFound);

app.use(error.handler);

export default app;
