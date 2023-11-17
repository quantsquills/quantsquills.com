import Airtable from 'airtable';
import { AIRTABLE_ACCESS_TOKEN } from '$env/static/private';
import z from 'zod';
import { format } from 'date-fns';

Airtable.configure({
  apiKey: AIRTABLE_ACCESS_TOKEN
});

const base = Airtable.base('appAdr9jIUxc3YdxR');

export const Location = z.object({
  id: z.string(),
  name: z.string(),
  street: z.string(),
  postcode: z.string()
});
export type Location = z.infer<typeof Location>;

export const Speaker = z.object({
  id: z.string(),
  name: z.string().optional(),
  gender: z.enum(['male', 'female', 'non-binary']).optional(),
  presentations: z.string().array(),
  links: z.string().array().optional()
});
export type Speaker = z.infer<typeof Speaker>;

export const Presentation = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  event: z.string().array(),
  speakers: z.string().array().optional(),
  speakersObj: z.array(Speaker).optional()
});
export type Presentation = z.infer<typeof Presentation>;

export const Event = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  meetup_url: z.string(),
  presentations: z.array(z.string()).optional(),
  presentationsObj: z.array(Presentation).optional(),
  video: z.string().optional(),
  location: z.string().array().optional(),
  locationObj: Location.optional(),
  hero_image: z
    .object({
      id: z.string(),
      width: z.number(),
      height: z.number(),
      url: z.string(),
      filename: z.string(),
      size: z.number(),
      type: z.string(),
      thumbnails: z.record(
        z.enum(['small', 'large', 'full']),
        z.object({
          url: z.string(),
          width: z.number(),
          height: z.number()
        })
      )
    })
    .array()
    .optional()
});
export type Event = z.infer<typeof Event>;

const getLocations = async () => {
  return (await base('locations').select().all()).map((r) =>
    Location.parse({ id: r.id, ...r.fields })
  );
};

export const getEvents = async () => {
  const records = (await base('events').select().all())
    .filter((r) => !!r.get('date'))
    .map((r) => Event.parse({ id: r.id, ...r.fields }))
    .map((r) => ({
      ...r,
      title: r.title || format(new Date(r.date), 'MMMM yyyy')
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return await addLocations(records);
};

export const getPresentations = async () => {
  const records = await base('presentations').select().all();
  return records.map((r) => Presentation.parse({ id: r.id, ...r.fields }));
};

export const getSpeakers = async () => {
  const records = await base('speakers').select().all();
  return records.map((r) => Speaker.parse({ id: r.id, ...r.fields }));
};

export const getLinks = async () => {
  const records = await base('links').select().all();
  return records.map((r) => r.fields);
};

export const addEvent = async (presentations: Presentation[]) => {
  const allEvents = await getEvents();
  return presentations.map((d) => ({
    ...d,
    event: allEvents.find((dd) => dd.id === d.event[0])
  }));
};

const isPresentation = (u: Presentation | undefined): u is Presentation => !!u;

export const addPresentations = async (events: Event[]) => {
  const allPresentations = await getPresentations();
  return events.map((d) => ({
    ...d,
    presentationsObj: d.presentations
      ?.map((p) => allPresentations.find((pp) => pp.id === p))
      .filter(isPresentation)
  }));
};

const isSpeaker = (u: Speaker | undefined): u is Speaker => !!u;

export const addSpeakers = async (presentations: Presentation[]) => {
  const allSpeakers = await getSpeakers();
  return presentations.map((d) => ({
    ...d,
    speakers: d.speakers
      ?.map((s) => allSpeakers.find((ss) => ss.id === s))
      .filter(isSpeaker)
  }));
};

const isLocation = (u: unknown): u is Location => Location.safeParse(u).success;

export const addLocations = async (events: Event[]) => {
  const allLocations = await getLocations();
  return events.map((d) => {
    return {
      ...d,
      locationObj: allLocations.find((l) => l.id === d.location?.[0])
    };
  });
};
