<script lang="ts">
</script>

<svelte:head>
  <meta
    name="description"
    content="A not-for-profit, volunteer run organisation based in Brisbane, Australia exploring the future of media by bringing together technologists and storytellers." />
  <title>Quants & Quills</title>
</svelte:head>

<div class="container mx-auto">
  <main class="hero">
    Quants &amp; Quills is a not-for-profit, volunteer run organisation based in <strong
      >Brisbane, Australia</strong
    >. We are exploring the future of media by bringing together technologists
    and storytellers. We run a{' '}
    <strong>
      free <a href="/hacks-hackers-brisbane">event series</a>
    </strong>{' '}
    — the local chapter of Hacks/Hackers — and a{' '}
    <strong>
      <a href="/newsletter">newsletter</a>
    </strong>{' '}
  </main>
  <footer class="footer">
    <img
      src="/quants-quills-logo.svg"
      alt="Quants & Quills logo"
      class="logo" />
    <p>
      Find us on the <a rel="me" href="https://bne.social/@hackshackers"
        >Fediverse</a>
      or
      <a rel="me" href="https://www.linkedin.com/company/quants-and-quills/"
        >LinkedIn</a>
      or join the discussion on{' '}
      <a href="https://storieswithdata.community">Slack</a>. Find out about{' '}
      <a href="/volunteer">volunteering</a> or{' '}
      <a href="/pitch-a-talk">speaking</a> at a Hacks/Hackers Brisbane event.
    </p>
  </footer>
</div>

<style lang="scss">
  .container {
    max-width: 1000px;
  }
  .hero {
    font-size: 2.2rem;
    max-width: var(--max-width);
    margin: 4rem 2rem 2rem 2rem;
    text-align: center;

    @media (max-width: 50rem) {
      font-size: 5vw;
      line-height: 1.2em;
    }

    @media (max-width: 20rem) {
      font-size: 1rem;
    }
  }

  .footer {
    display: flex;
    flex-direction: row;
    max-width: var(--max-width);
    padding: 4rem;
    justify-content: center;

    @media (max-width: 30rem) {
      padding: 2rem;
    }

    > p {
      width: 60%;
      opacity: 0.6;
    }

    .logo {
      width: 4rem;
      height: 4rem;
      margin: 0 2rem 2rem 0;
    }
  }
</style>
