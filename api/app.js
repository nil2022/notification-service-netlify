export function GET(request) {
	return new Response
	(`Hello from ${process.env.VERCEL_REGION}`);

}

export function POST(request) {
	return new Response
	(`Hello from ${process.env.VERCEL_REGION}`);
}

// export const config = {
// 	runtime: 'nodejs'
// };

//command: vercel deploy