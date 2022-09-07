import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styles from './index.module.scss';
import logo from '../assets/quants-quills-logo.svg';

export const HomepageTemplate = props => {
  const { title, siteDescription } = props.data.site.siteMetadata;

  return (
    <div className={styles.container}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={title}
      />

      <main className={styles.hero}>
        Quants &amp; Quills is a not-for-profit, volunteer run organisation
        based in <strong>Brisbane, Australia</strong>. We are exploring the
        future of media by bringing together technologists and storytellers. We
        run a{' '}
        <strong>
          free <a href="/hacks-hackers-brisbane">monthly event</a>
        </strong>{' '}
        — the local chapter of Hacks/Hackers — and a{' '}
        <strong>
          <a href="/newsletter">newsletter</a>
        </strong>{' '}
      </main>
      <footer className={styles.footer}>
        <img src={logo} alt={`Quants & Quills logo`} className={styles.logo} />
        <p>
          Follow us on <a href="https://twitter.com/HacksHackersBNE">Twitter</a>{' '}
          or <a href="https://www.facebook.com/HacksHackersBNE">Facebook</a> or
          join the discussion on{' '}
          <a href="https://storieswithdata.community">Slack</a>. Find out about{' '}
          <Link to="/volunteer">volunteering</Link> or{' '}
          <Link to="/pitch-a-talk">speaking</Link> at a Hacks/Hackers Brisbane
          event.
        </p>
      </footer>
    </div>
  );
};

export default HomepageTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
    meetupGroup {
      events {
        name
        status
        local_date
        local_time
        link
        meetupId
        yes_rsvp_count
        description
      }
    }
  }
`;
