import { redirect, fail, type Actions } from '@sveltejs/kit';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

// turn the below into a load() function??
export const actions: Actions = {
    login: async ({cookies, request}: { cookies: Cookies, request: RequestEvent['request'] })  => {
        // console.log(cookies)
        const body = await request.formData();
        const login = body.get('login');
		const password = body.get('password');
		const credentials = btoa(`${login}:${password}`);

        const response = await fetch('https://01.kood.tech/api/auth/signin', {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
                "Authorization": `Basic ${credentials}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            cookies.set('token', result, {
				path: '/',
                secure: true,
				expires: new Date(Date.now() + 1000 * 60 * 20) // 20min
			});
            cookies.set('toast', 'You\'re In!', { 
                path: '/dashboard',
                maxAge: 60,
                httpOnly: false,
                secure: true,
                sameSite: 'none',
            });
            throw redirect(303, '/dashboard')
        } else {
            cookies.set('toast', 'Username/password not recognized', { 
                path: '/',
                maxAge: 1,
                httpOnly: false,
                secure: true,
                sameSite: 'none',
            });
            // return fail(400, { error: 'Invalid login or password' });
        }
    }
};

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }