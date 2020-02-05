import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Event from '../components/event';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';
import styles from './index.module.scss';
import logo from '../assets/quants-quills-logo.svg';

export const HomepageTemplate = props => {
  console.log('props', props);
  const { siteTitle, siteDescription } = props.data.site.siteMetadata;
  const location = props.location;
  const { events, next_event } = props.data.meetupGroup;
  const meetup = events.find(e => e.meetupId === next_event.id);

  return (
    <div className={styles.container}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />

      <main className={styles.hero}>
        Quants &amp; Quills is a not-for-profit, volunteer run organisation
        based in <strong>Brisbane, Australia</strong>. We are working on
        building the future of media through a{' '}
        <strong>
          <Link to="/hacks-hackers-brisbane">monthly event</Link>
        </strong>{' '}
        and{' '}
        <strong>
          <Link to="/newsletter">newsletter</Link>
        </strong>
        .
      </main>
      <footer className={styles.footer}>
        <img src={logo} alt={`Quants & Quills logo`} className={styles.logo} />
        <p>
          Follow us on <a href="https://twitter.com/HacksHackersBNE">Twitter</a>{' '}
          or <a href="https://www.facebook.com/HacksHackersBNE">Facebook</a> or
          join the discussion on{' '}
          <a href="https://storieswithdata.community">Slack</a>. Find out more
          about <Link to="/sponsorship">sponsoring our work</Link> or{' '}
          <Link to="/pitch-a-talk">speaking</Link> at our events.
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
      next_event {
        id
      }
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
