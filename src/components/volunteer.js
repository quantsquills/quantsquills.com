import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'date-fns';
import useForm from './useForm';

import {
  FormError,
  FormFieldError,
  FormLabel,
  FormInput,
  FormTextarea,
  Button,
} from './shared';

const SubmitButton = styled(Button)`
  margin-top: 1em;
`;

export const VolunteerForm = ({ role, meetup, onSubmit, error }) => {
  const stateSchema = {
    name: { value: '' },
    contact: { value: '' },
  };

  const validationSchema = {
    name: { required: true },
    contact: { required: true },
  };

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationSchema,
    onSubmit
  );

  const date = new Date(meetup.local_date);

  // Validate fields
  return (
    <>
      <h2>Thanks for offering to help!</h2>
      <p>
        Throw your name and contact details in here to let us know you can help{' '}
        <strong>{role.sentence}</strong> for the <strong>{meetup.name}</strong>{' '}
        event on <strong>{format(date, 'd MMM yyyy')}</strong>.
      </p>
      {error ? <FormError>{error}</FormError> : null}
      <form onSubmit={handleOnSubmit}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput
          name="name"
          type="text"
          value={state.name.value}
          onChange={handleOnChange}
        />
        {state.name.error && (
          <FormFieldError>{state.name.error}</FormFieldError>
        )}
        <FormLabel htmlFor="contact">Contact</FormLabel>
        <FormTextarea
          name="contact"
          value={state.contact.value}
          onChange={handleOnChange}
        ></FormTextarea>
        {state.contact.error && (
          <FormFieldError>{state.contact.error}</FormFieldError>
        )}
        <SubmitButton type="submit">Sign me up</SubmitButton>
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
