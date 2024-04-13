import './src/crons/cron.js';
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import express from 'express';
import securedHeaders from 'helmet';
import limiter from './src/utils/api-rate-limiter.js';
import logger from './src/utils/pinoLogger.js';
import pinoHTTP from 'pino-http';

const app = express();

/************************************************** */
// logger.fatal('fatal');
// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.debug('debug');
// logger.trace('trace');

/** ***************************************************** */

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(limiter); // express-rate-limit middleware
app.use(securedHeaders());
app.use(pinoHTTP({ logger }));

const connectDB = async () => {
		const startTime = Date.now();
		const connect = await mongoose.connect(process.env.DB_URL);
		logger.info(`Time taken to connect to DB: ${Date.now() - startTime}ms`);
		logger.info(`MongoDB Connected to Host: ${connect.connection.host}`);
};

import notificationRouter from './src/routes/ticketNotification.route.js';
app.use('/api/v1/notify', notificationRouter);


connectDB()
	.then(() => {
		app.listen(process.env.SERVER_PORT || 8000, () => {
			logger.info(
				`Notification service listening to PORT ${process.env.SERVER_PORT}`
			);
		});
	})
	// IF DB CONNECT FAILED, CATCH ERROR
	.catch((err) => logger.error(err, "Can't connect to DB:")); 

app.get('/health', (req, res) => {
    logger.info('Notification Service is up and Running !');
	return res.status(200).json({
		message: 'Notification Service is up and Running 👍🏻',
		statusCode: 200,
		success: true
	});
});

app.listen(process.env.SERVER_PORT || 8000, () => {
	logger.info(
		`Notification service listening to PORT ${process.env.SERVER_PORT}`
	);
});

export const handler = serverless(app);