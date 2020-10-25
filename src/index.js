import { port, env } from './configs/vars';
import logger from './configs/logger';
import app from './configs/express';
import connectDatabase from './configs/mongoose';

connectDatabase();

app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

export default app;
