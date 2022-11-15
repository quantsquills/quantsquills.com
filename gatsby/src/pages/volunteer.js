import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { format, utcToZonedTime } from 'date-fns-tz';
import { rhythm } from '../utils/typography';
import {
  SiteTitle,
  Section,
  SectionTitle,
  SectionContent,
  StandFirst,
} from '../components/section.js';

import { Button } from '../components/shared';

import { VolunteerForm } from '../components/volunteer.js';

const modalStyles = {
  content: {
    maxWidth: '40rem',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#___gatsby');

async function fetchRosterData() {
  const res = await fetch('/.netlify/functions/volunteer');
  return res.json();
}

async function addRosterData({ meetup, role, name, contact }) {
  const res = await fetch(
    `/.netlify/functions/volunteer?name=${encodeURIComponent(
      name
    )}&contact=${encodeURIComponent(contact)}&meetup=${encodeURIComponent(
      meetup
    )}&role=${encodeURIComponent(role)}`,
    { method: 'POST' }
  );
  return res.json();
}

export const Volunteer = props => {
  const { siteTitle, siteDescription } = props.data.site.siteMetadata;
  const location = props.location;
  const { events } = props.data.meetupGroup;
  const now = Date.now();
  const future = events
    .filter(e => e.time > now) // Only future events here
    .reverse() // Put them in chronological order
    .slice(0, 6); // Show six at the most.

  const volunteerRoles = props.data.allVolunteerRolesYaml.edges;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [rosterData, setRosterData] = useState(null);
  const [meetup, setMeetup] = useState(null);
  const [role, setRole] = useState(null);
  const [volunteerFormError, setVolunteerFormError] = useState(null);

  // Load the spreadsheet data
  useEffect(() => {
    fetchRosterData().then(setRosterData);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setVolunteerFormError(null);
    setIsOpen(false);
  }

  function getVolunteers(eventId, roleId) {
    return rosterData === null
      ? null
      : rosterData.filter(d => d[0] === eventId && d[1] === roleId);
  }

  return (
    <div>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Volunteer"
      >
        <VolunteerForm
          meetup={meetup}
          role={role}
          error={volunteerFormError}
          onSubmit={async ({ name, contact }) => {
            setVolunteerFormError(null);
            let newRoster;
            try {
              newRoster = await addRosterData({
                name: name.value,
                contact: contact.value,
                meetup: meetup.dateId,
                role: role.id,
              });
            } catch (e) {
              return setVolunteerFormError(
                'Sorry, there was an error saving your details, please try again.'
              );
            }

            closeModal();
            setRosterData(newRoster);
          }}
        />
      </Modal>

      <Section>
        <SectionTitle>
          <SiteTitle />
        </SectionTitle>
        <SectionContent>
          <h1>Volunteering</h1>
          <StandFirst>
            Thanks for being part of the <strong>Hacks/Hackers Brisbane</strong>{' '}
            community!
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
          <p>Events start at 6pm unless noted and usually run for 2-3 hours.</p>
        </SectionContent>
      </Section>

      {future.map(ev => {
        const timeZone = 'Australia/Brisbane';
        const date = utcToZonedTime(ev.time, timeZone);
        const meetup = Object.assign({}, ev, {
          date,
          dateId: format(date, 'yyyy-MM-dd'),
        });
        return (
          <Section key={meetup.meetupId} id={meetup.dateId}>
            <SectionTitle>{format(meetup.date, 'MMMM dd')}</SectionTitle>
            <SectionContent>
              <h4 style={{ marginTop: rhythm(0.1) }}>{meetup.name}</h4>
              <p>
                <a href={meetup.link}>Full event details →</a>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Volunteers</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteerRoles.map(({ node }) => {
                    const role = node;
                    const volunteers = getVolunteers(meetup.dateId, role.id);
                    return (
                      <tr key={role.id} style={{ verticalAlign: 'top' }}>
                        <td>
                          {role.name}
                          {role.count ? ` x ${role.count}` : null}
                          {role.description ? (
                            <small>
                              <br />
                              {role.description}
                            </small>
                          ) : null}
                        </td>
                        <td>
                          {volunteers && volunteers.length > 0 ? (
                            <p>{volunteers.map(d => d[2]).join(', ')}</p>
                          ) : null}

                          {!volunteers ||
                          volunteers.length < role.count ||
                          !role.count ? (
                            <Button
                              onClick={() => {
                                setMeetup(meetup);
                                setRole(role);
                                openModal();
                              }}
                              style={{
                                display: rosterData ? 'block' : 'none',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              I can help!
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
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
    allVolunteerRolesYaml {
      edges {
        node {
          id
          description
          sentence
          name
          count
        }
      }
    }
    meetupGroup {
      events {
        name
        status
        time
        link
        meetupId
        yes_rsvp_count
        description
      }
    }
  }
`;
