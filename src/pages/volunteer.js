import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
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
  const { events, next_event } = props.data.meetupGroup;
  const future = events
    .filter(e => e.status === 'upcoming')
    .reverse()
    .slice(0, 6);

  const volunteerRoles = props.data.allVolunteerRolesYaml.edges;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [rosterData, setRosterData] = useState(null);
  const [meetup, setMeetup] = useState(null);
  const [role, setRole] = useState(null);

  // Load the spreadsheet data
  useEffect(() => fetchRosterData().then(setRosterData), []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getVolunteer(eventId, roleId) {
    console.log('rosterData', rosterData);
    return rosterData === null
      ? null
      : rosterData.find(d => d[0] === eventId && d[1] === roleId);
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
          onSubmit={async data => {
            const newRoster = await addRosterData(
              Object.assign({}, data, { meetup: meetup.dateId, role: role.id })
            );
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
        </SectionContent>
      </Section>

      {future.map(ev => {
        const date = new Date(`${ev.local_date}T${ev.local_time}+1000`);
        const meetup = Object.assign(
          {},
          ev,
          { date },
          { dateId: format(date, 'yyyy-MM') }
        );
        return (
          <Section key={meetup.id}>
            <SectionTitle>{format(meetup.date, 'MMMM yyyy')}</SectionTitle>
            <SectionContent>
              <p>{meetup.name}</p>
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {volunteerRoles.map(({ node }) => {
                    const role = node;
                    const volunteer = getVolunteer(meetup.dateId, role.id);
                    return (
                      <tr key={role.id}>
                        <td>
                          {role.name}
                          {role.description ? (
                            <>
                              <br />
                              <small>{role.description}</small>
                            </>
                          ) : null}
                        </td>
                        <td>
                          <em>
                            {volunteer ? (
                              volunteer[2]
                            ) : (
                              <Button
                                onClick={() => {
                                  setMeetup(meetup);
                                  setRole(role);
                                  openModal();
                                }}
                              >
                                I can help!
                              </Button>
                            )}
                          </em>
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
          name
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
