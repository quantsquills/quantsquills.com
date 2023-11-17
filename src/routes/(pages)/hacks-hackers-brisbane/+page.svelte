<script lang="ts">
  import PageBody from '$lib/PageBody.svelte';
  import PageHeader from '$lib/PageHeader.svelte';
  import SectionTitle from '$lib/SectionTitle.svelte';
  import { format } from 'date-fns';
  import type { PageData } from './$types';
  import { micromark } from 'micromark';
  export let data: PageData;

  $: pastEvents = data.allEvents.filter(
    (d) => new Date(d.date).getTime() < Date.now()
  );

  $: [nextEvent, ...futureEvents] = data.allEvents.filter(
    (d) => new Date(d.date).getTime() > Date.now()
  );
</script>

<PageHeader>
  {#if nextEvent}
    <h1
      >{(nextEvent.presentationsObj || []).length > 1
        ? nextEvent.title
        : nextEvent.presentationsObj?.[0].title}</h1>
    <div class="event-details">
      <time
        >{format(
          new Date(nextEvent.date),
          "EEEE, d MMMM yyyy 'at' h:mmaaaa"
        )}</time>
      <div
        >{nextEvent.locationObj?.name}<br />{nextEvent.locationObj
          ?.street}</div>
      <div>
        <a class="rsvp-link" href={nextEvent.meetup_url}>RSVP</a>
      </div>
    </div>
    {#if nextEvent.presentationsObj}
      {#each nextEvent.presentationsObj as presentation}
        {#if presentation}
          <div>
            {#if nextEvent.presentationsObj.length > 1}
              {presentation.title}
            {/if}
            {@html micromark(presentation.description || '')}
          </div>
        {/if}
      {/each}
    {/if}
  {/if}
</PageHeader>

<h2>Past events</h2>
<PageBody>
  {#each pastEvents as event}
    <SectionTitle>{event.title}</SectionTitle>
    {#if event.presentationsObj}
      {#each event.presentationsObj as presentation}
        {#if presentation}
          <div>
            <p
              ><span class="font-semibold">{presentation.title}</span>
              {#if presentation.speakers}
                <span class="text-sm text-gray-400 block"
                  >Presenters: {#each presentation.speakers as speaker, i}{presentation
                      .speakers.length -
                      1 ===
                    i
                      ? speaker.name
                      : `${speaker.name}, `}{/each}</span>
              {/if}
            </p>
          </div>
        {/if}
      {/each}
    {:else}
      {@html micromark(event.description || 'No description')}
    {/if}
  {/each}
</PageBody>

<style>
  .event-details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    font-size: 0.8em;
    line-height: 1.1;
    margin-bottom: 1em;
  }

  .event-details > * {
    background-color: rgba(200, 200, 200, 0.15);
    padding: 1em;
    border-radius: 10px;
  }

  .rsvp-link {
    font-weight: bold;
    color: #fff;
    text-shadow: none;
    background-color: #1ca086;
    display: block;
    text-align: center;
    padding: 0.5em;
    border-radius: 6px;
  }
</style>
