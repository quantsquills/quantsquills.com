import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async () => {
	// TODO: Move this to an API route so we can request on front end too. Use front-end back-end missmatch to trigger a rebuild
	const variables = { urlname: 'hacks-hackers-brisbane' };
	const query = `
		query($urlname: String!) {
			groupByUrlname(urlname: $urlname) {
				id
				name
				upcomingEvents(input: { first: 10 }) {
					edges {
						node {
							id
							title
							description
							eventUrl
							shortDescription
							dateTime
							venue {
								name
								address
								city
								state
								postalCode
								country
								lat
								lng
							}
						}
					}
				}
			}
		}
	`;

	const response = await fetch('https://api.meetup.com/gql', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables })
	});

	const MeetupDataSchema = z.array(
		z.object({
			node: z.object({
				id: z.string(),
				title: z.string(),
				description: z.string(),
				eventUrl: z.string().url(),
				shortDescription: z.string().nullable(),
				dateTime: z.preprocess((arg) => {
					if (typeof arg === 'string' || arg instanceof Date)
						return new Date(arg);
				}, z.date()),
				venue: z.object({
					name: z.string(),
					address: z.string(),
					city: z.string(),
					state: z.string(),
					postalCode: z.string(),
					country: z.string(),
					lat: z.number(),
					lng: z.number()
				})
			})
		})
	);

	const { data } = await response.json();
	return {
		events: MeetupDataSchema.parse(data.groupByUrlname.upcomingEvents.edges)
	};
};
