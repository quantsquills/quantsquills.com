import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { format } from 'date-fns';
import {
  SiteTitle,
  Section,
  SectionTitle,
  SectionContent,
  StandFirst,
  Button,
} from '../components/section.js';

export const Volunteer = props => {
  const { siteTitle, siteDescription } = props.data.site.siteMetadata;
  const location = props.location;
  const { events, next_event } = props.data.meetupGroup;
  const meetup = events.find(e => e.meetupId === next_event.id);
  const future = events.filter(e => e.status === 'upcoming').reverse();
  console.log(future);
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
          <h1>Volunteering</h1>
          <StandFirst>
            Thanks for being part of the Hacks/Hackers Brisbane community!
          </StandFirst>
          <p>
            Each event that we put on takes a considerable amount of work and
            coordination, so we're always keen to hear from people who are
            willing to help out the core group of organisers in any way — large
            or small.
          </p>
          <h2>How to help</h2>
          <p>
            If you can help out, let us know by hitting the{' '}
            <strong>I can help</strong> button on any of the unfilled volunteer
            roles below.
          </p>
        </SectionContent>
      </Section>

      {future.map(ev => {
        const date = new Date(`${ev.local_date}T${ev.local_time}+1000`);
        return (
          <Section key={ev.id}>
            <SectionTitle>{format(date, 'MMMM yyyy')}</SectionTitle>
            <SectionContent>
              <p>{ev.name}</p>
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Buy the ice</td>
                    <td>
                      <em>role filled</em>
                    </td>
                  </tr>
                  <tr>
                    <td>Setup</td>
                    <td>
                      <Button>I can help</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Packup</td>
                    <td>
                      <Button>I can help</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Event photography</td>
                    <td>
                      <Button>I can help</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </SectionContent>
          </Section>
        );
      })}
    </div>
  );
};

export default Volunteer;

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
