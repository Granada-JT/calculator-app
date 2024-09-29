import { PUBLIC_GA_M_ID } from '$env/static/public';

export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(/{{ GA_M_ID }}/g, PUBLIC_GA_M_ID)
	});
	return response;
}
