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

<h1>Upcoming events</h1>
<iframe
	title="RSVP for our next event"
	id="iframe-container"
	src="https://events.humanitix.com/event-listings?w=true&u=LOhAYQGhQWggJrrUsxhJfUdBxKp1&o=all&bc=%23353337&bt=RSVP%20Here&tc=%23FFFFFF"
	width="100%"
	height="600px"
	frameborder="0" />

<style>
</style>
