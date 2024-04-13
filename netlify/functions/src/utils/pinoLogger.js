import pino from 'pino';

export default pino(
	{
		level: 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
        // timestamp: pino.stdTimeFunctions.isoTime,
        // transport: [
        //     {
        //         target: 'pino-pretty',
        //         options: {
        //             colorize: true,
        //             translateTime: 'SYS:standard',
        //         },
                
        //     },
        // ],
        
        // redact: {
        //     paths: ['password'],
        //     censor: '***',
        //     remove: true
        // },
	},
    // allTransport
);
