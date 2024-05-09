import Airtable from 'airtable';
import { AIRTABLE_ACCESS_TOKEN } from '$env/static/private';

import { format } from 'date-fns';
import { Event, Location, Presentation, Speaker } from './airtable-types';

Airtable.configure({
  apiKey: AIRTABLE_ACCESS_TOKEN
});

const base = Airtable.base('appAdr9jIUxc3YdxR');

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
