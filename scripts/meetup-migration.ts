#!/usr/bin/env ts-node

import Airtable from 'airtable';
import { z } from 'zod';
import { writeFile } from 'fs';
import { Event } from '../src/lib/airtable-types.js';

Airtable.configure({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN
});

const base = Airtable.base('appAdr9jIUxc3YdxR');

const variables = { urlname: 'hacks-hackers-brisbane' };
const query = `
		query($urlname: String!) {
			groupByUrlname(urlname: $urlname) {
				id
				name
				pastEvents(input: { first: 300 }) {
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

const pastEvents = MeetupDataSchema.parse(data.groupByUrlname.pastEvents.edges);

type Record = {
  meetup_url: string;
  title: string;
  description: string;
  location?: string[];
};

const records: Record[] = pastEvents.map((event) => {
  const record: Record = {
    meetup_url: (event.node.eventUrl + '/').replace(
      'hacks-hackers-brisbane',
      'Hacks-Hackers-Brisbane'
    ),
    title: event.node.title,
    description: event.node.description
  };
  if (event.node.venue.address === '114 Grey St') {
    record.location = ['reczwOiVdtd1G59cD'];
  }
  return record;
});

const chunkedRecords: Record[][] = [];
const chunkSize = 10;
for (let i = 0; i < records.length; i += chunkSize) {
  chunkedRecords.push(records.slice(i, i + chunkSize));
}

// console.log('chunkedRecords :>> ', chunkedRecords);

const pause = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

chunkedRecords.forEach(async (records) => {
  base('events').update(
    // @ts-ignore Airtable types don't support upsert, but API seems to.
    records.map((fields) => ({ fields })),
    {
      typecast: true,
      performUpsert: {
        fieldsToMergeOn: ['meetup_url']
      }
    },
    (err: Error, data: unknown) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    }
  );
  await pause(10000);
});
