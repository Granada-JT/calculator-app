import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response('hello')
}

export const POST: RequestHandler = async (event) => {
    
    const data = await event.request.formData();
    const equation = data.get('equation')

    console.log(equation);

    return new Response(JSON.stringify({
        success: true
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}