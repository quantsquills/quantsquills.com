<script lang="ts">
	import TalkPitchForm from '$lib/TalkPitchForm.svelte';
	import PageHeader from '$lib/PageHeader.svelte';
	import SectionTitle from '$lib/SectionTitle.svelte';
	import PageBody from '$lib/PageBody.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<PageHeader>
	<h1>Speaking at Hacks/Hackers</h1>
	<p>
		Whether you've never spoken before, need a dress rehearsal for a big
		industry conference or are a veteran of the meetup circuit, we're always
		looking for people with something to say around the interSection of
		storytelling and technology.
	</p>
</PageHeader>
<PageBody>
	<SectionTitle>Why speak?</SectionTitle>
	<div>
		<p>
			Sharing your expertise and knowledge with an audience really helps you
			understand a topic deeply.
		</p>
		<h4>So what kind of people are we looking for, exactly?</h4>
		<p>
			If you've got something to say that involves the interSection of
			storytelling and technology, we're looking for you!
		</p>
		<p>
			You could be an <a
				href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/249086584/">
				artist
			</a>
			using satellite imagery in your work, a<a
				href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/259780698/">
				lawyer</a>
			working on something new. Maybe you're an
			<a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/249890339/">
				academic
			</a>
			who's into Brisbane's nightlife and Instagram. You could be a
			<a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/263306586/">
				legal scholar
			</a>
			concerned about Australia's data retention and surveillance regimes or a
			<a
				href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/jdkhqlyvhbhc/">
				civil society hacker
			</a>
			building something important. Maybe even a
			<a
				href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/jdkhqlyvnbjc/">
				student
			</a> keen to show off your final year project.
		</p>
		<p>
			Or maybe you're an internationally renowned <a
				href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/bsggqmywpblc/">
				expert in data visualisation
			</a> (we should be so lucky).
		</p>
	</div>
	<SectionTitle>Is it just talks?</SectionTitle>
	<div>
		<p
			>Definitely not! Some of the best events we've held have been workshops
			and panels.</p>
		<p>
			If you have an idea for a workshop or a panel and would like to work with
			us to see it happen <a href="mailto:hello@quantsquills.com"
				>get in touch</a
			>.
		</p>
	</div>
	<SectionTitle>Pitch it</SectionTitle>
	<div>
		<p
			>We'd love to hear from you if you want to <strong>pitch a talk</strong>
			or <strong>suggest a speaker</strong>. You can
			<a
				href="mailto:hello@quantsquills.com?subject=Hacks%2FHackers%20talk%20pitch"
				>email us</a> to get the ball rolling and we'll get back to you as soon as
			we can.</p>
	</div>
</PageBody>
