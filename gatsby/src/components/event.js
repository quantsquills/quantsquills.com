import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { rhythm, scale } from '../utils/typography';
import styles from './event.module.scss';

export default function Event({ meetup }) {
  const date = new Date(`${meetup.local_date}T${meetup.local_time}+1000`);

  return (
    <section className={styles.event}>
      <h1 style={{ fontSize: '3rem' }}>
        <span>Next event</span> {meetup.name}
      </h1>
      <p>
        {meetup.local_date}
        <a href={meetup.link}>Register</a>{' '}
        <a
          href={`mailto:hello@quantsquills.com?subject=Volunteering at ${encodeURIComponent(
            meetup.name
          )}`}
        >
          Volunteer
        </a>
      </p>
      <div
        style={{
          marginLeft: rhythm(2),
          marginTop: rhythm(4),
        }}
        dangerouslySetInnerHTML={{ __html: meetup.description }}
      />
    </section>
  );
}
