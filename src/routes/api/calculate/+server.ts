import type { RequestHandler } from './$types';
export const POST: RequestHandler = async (event) => {
    const { equation } = await event.request.json(); // Retrieve the equation from the request body

    console.log(equation);

    const responseBody = {
        success: true
    };

    return new Response(JSON.stringify(responseBody), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};