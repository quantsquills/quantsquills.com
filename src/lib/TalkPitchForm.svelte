<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '.svelte-kit/types/src/routes/(pages)/pitch-a-talk/$types';
	import Button from './Button.svelte';
	export let form: ActionData;
</script>

{#if form?.success}
	<p class="font-bold"
		>Thanks for submitting a pitch! We'll be in touch shortly for more details.</p>
{:else}
	<form method="POST" use:enhance>
		<label
			>Talk title <input name="title" type="text" />
			{#if form?.missing?.includes('title')}<p class="error"
					>Have a crack at a title for your talk. We won't hold you to it if you
					want to change it later.</p
				>{/if}
		</label>
		<label
			>What's it all about
			<textarea name="pitch" />
			{#if form?.missing?.includes('pitch')}<p class="error"
					>We need to know what you plan to talk about. The more detail the
					better, but even something short will do go get the ball rolling.</p
				>{/if}
		</label>
		<label
			>Email address
			<input name="email" type="email" />
			{#if form?.missing?.includes('email')}<p class="error"
					>We need to know how to get in touch once we've read your pitch.</p
				>{/if}
		</label>
		<Button>Submit</Button>
	</form>
{/if}

<style>
	label {
		margin-bottom: 1em;
	}

	label,
	input,
	textarea {
		display: block;
		width: 100%;
	}

	textarea {
		height: 5em;
	}

	input,
	textarea {
		border: 1px solid #000;
	}

	.error {
		font-size: small;
		color: red;
	}
</style>
