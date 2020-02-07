import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import {
  SiteTitle,
  Section,
  SectionTitle,
  SectionContent,
  StandFirst,
  Button,
} from '../components/section.js';

export const Speaking = props => {
  const { siteTitle, siteDescription } = props.data.site.siteMetadata;
  const location = props.location;
  const { events, next_event } = props.data.meetupGroup;
  const meetup = events.find(e => e.meetupId === next_event.id);

  return (
    <div>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />

      <Section>
        <SectionTitle>
          <SiteTitle />
        </SectionTitle>
        <SectionContent>
          <h1>Speaking at Hacks/Hackers</h1>
          <StandFirst>
            Whether you've never spoken before, need a dress rehearsal for a big
            industry conference or are a veteran of the meetup circuit, we're
            always looking for people with something to say around the
            intersection of storytelling and technology.
          </StandFirst>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Why speak?</SectionTitle>
        <SectionContent>
          <p>
            Sharing your expertise and knowledge with an audience really helps
            you understand a topic deeply.
          </p>
          <h4>So what kind of people are we looking for, exactly?</h4>
          <p>
            If you've got something to say that involves the intersection of
            storytelling and technology, we're looking for you!
          </p>
          <p>
            You could be an{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/249086584/">
              artist
            </a>{' '}
            using satellite imagery in your work , a{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/259780698/">
              lawyer
            </a>{' '}
            working on something new. Maybe you're an{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/249890339/">
              academic
            </a>{' '}
            who's into Brisbane's nightlife and Instagram. You could be a{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/263306586/">
              legal scholar
            </a>{' '}
            concerned about Australia's data retention and surveillance regimes
            or a{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/jdkhqlyvhbhc/">
              civil society hacker
            </a>{' '}
            building something important. Maybe even a{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/jdkhqlyvnbjc/">
              student
            </a>{' '}
            keen to show off your final year project.
          </p>
          <p>
            Or maybe you're an internationally renowned{' '}
            <a href="https://www.meetup.com/Hacks-Hackers-Brisbane/events/bsggqmywpblc/">
              expert in data visualisation
            </a>{' '}
            (we should be so lucky).
          </p>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>What topics?</SectionTitle>
        <SectionContent>
          <p>We've had talks on ...</p>
          <em>Talk pitch form...</em>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Is it just talks?</SectionTitle>
        <SectionContent>
          <p>
            Definitely not! Some of the best events we've held have been
            workshops and panels.
          </p>
          <p>
            If you have an idea for a workshop or a panel and would like to work
            with us to see it happen{' '}
            <a href="mailto:hello@quantsquills.com">get in touch</a>.
          </p>
        </SectionContent>
      </Section>
    </div>
  );
};

export default Speaking;

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
