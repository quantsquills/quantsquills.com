import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const VolunteerForm = ({ role, meetup, onSubmit }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = ev => {
    onSubmit({ name, contact });
    ev.preventDefault();
  };

  return (
    <>
      <h2>Thanks for offering to help!</h2>
      <p>
        Throw your name and contact details in here to let us know you can help
        with <strong>{role.name}</strong> for the <strong>{meetup.name}</strong>{' '}
        event on <strong>{meetup.local_date}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
        <label for="contact">Contact</label>
        <input
          name="contact"
          type="text"
          value={contact}
          onChange={ev => setContact(ev.target.value)}
        />
        <input type="submit" value="Sign me up" />
      </form>
      <p>
        <small>
          <strong>Note:</strong> The name you enter here will be displayed on
          this website, but the contact details are confidential and only
          accessible to event organisers.
        </small>
      </p>
    </>
  );
};
