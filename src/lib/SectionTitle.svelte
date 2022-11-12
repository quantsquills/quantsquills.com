<script lang="ts">
	export let name: string | undefined = undefined;
</script>

<h2 class="text-base md:uppercase mt-0" {name}><slot /></h2>
