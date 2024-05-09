import { addPresentations, addSpeakers, getEvents } from '$lib/airtable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const allEvents = await Promise.all(
    (await addPresentations(await getEvents())).map(async (d) => {
      return {
        ...d,
        presentationsObj: d.presentationsObj
          ? await addSpeakers(d.presentationsObj || [])
          : undefined
      };
    })
  );

  return {
    allEvents
  };
};
