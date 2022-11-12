<script lang="ts">
	import type { PageData } from './$types';
	import { micromark } from 'micromark';
	export let data: PageData;
	const getMonthString = (month: number) =>
		[
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		][month];
</script>

{#each data.events as { node: { title, eventUrl, dateTime, description, venue } }}
	<div class="md:pl-48">
		<header>
			<h1>{title}</h1>
			<div class="md:float-left md:-ml-48 md:w-40 meta">
				<time datetime={dateTime.toISOString()}
					>{dateTime.getDate()}
					{getMonthString(dateTime.getMonth())}
					{dateTime.getFullYear()}
				</time>
				<p>{!!venue.address ? venue.address : venue.name}</p>
				<a
					class="md:w-full inline-block px-4 py-2 mb-4 no-underline bg-slate-600 hover:bg-slate-900 transition-colors text-white no-border shadow-none text-center no-border"
					href={eventUrl}>RSVP</a>
			</div>
		</header>

		{@html micromark(description)}
	</div>
	<hr />
{/each}

<style>
	.meta a {
		text-shadow: none;
		background-image: none;
	}
</style>
