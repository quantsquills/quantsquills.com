import { invalid } from '@sveltejs/kit';
// import type { Actions } from './$types';
// import { NOTIFICATIONS_EMAIL, SENDGRID_API_KEY } from '$env/static/private';
// import * as sg from '@sendgrid/mail';

// sg.setApiKey(SENDGRID_API_KEY);

// export const actions: Actions = {
// 	default: async ({ request }) => {
// 		const data = await request.formData();

// 		const email = data.get('email');
// 		const title = data.get('title');
// 		const pitch = data.get('pitch');

// 		// Validation
// 		const missing: string[] = [];

// 		if (!email) missing.push('email');
// 		if (!title) missing.push('title');
// 		if (!pitch) missing.push('pitch');

// 		if (missing.length > 0) {
// 			return invalid(400, { email, title, pitch, missing });
// 		}

// 		// TODO: send it somewhere!
// 		const message = {
// 			from: 'notifications@quantsquills.com',
// 			to: NOTIFICATIONS_EMAIL,
// 			subject: 'Talk pitch submission from quantsquills.com',
// 			text: `
// Title: ${title}
// Contact: ${email}
// Pitch: ${pitch}`
// 		};
// 		const result = await sg.send(message);

// 		return { success: true };
// 	}
// };
