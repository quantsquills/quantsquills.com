const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			gridTemplateColumns: {
				2: '300px minmax(0, 1fr)'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
