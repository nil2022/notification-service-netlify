export function GET(request) {
	return new Response
	(`Hello from ${process.env.VERCEL_REGION}`);

}

const server;

// export const config = {
// 	runtime: 'nodejs'
// };

//command: vercel deploy