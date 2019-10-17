import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Event from '../components/event';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';
import styles from './index.module.scss';

export const HomepageTemplate = props => {
  console.log('props', props);
  const { siteTitle, siteDescription } = props.data.site.siteMetadata;
  const location = props.location;
  const meetup = props.data.meetupGroup.events[0];

  return (
    <Layout className={styles.container} location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />

      <section class={styles.hero}>
        <Event meetup={meetup} />
      </section>
    </Layout>
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
        description
        local_date
      }
    }
  }
`;
