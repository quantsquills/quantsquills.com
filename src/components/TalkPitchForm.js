import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bugsnag from '@bugsnag/js';
import styled from 'styled-components';
import useForm from './useForm';

import {
  FormError,
  FormFieldError,
  FormLabel,
  FormInput,
  FormTextarea,
  Button,
} from './shared';

const bugsnagClient = bugsnag(process.env.BUGSNAG_ID);

const SubmitButton = styled(Button)`
  margin-top: 1em;
`;

export const TalkPitchForm = () => {
  const [status, setStatus] = useState(null);

  const stateSchema = {
    title: { value: '' },
    pitch: { value: '' },
    contact: { value: '' },
  };

  const validationSchema = {
    title: { required: true },
    pitch: { required: true },
    contact: { required: true },
  };

  const onSubmit = state => {
    setStatus('sending');
    fetch('/.netlify/functions/notify', {
      method: 'POST',
      body: JSON.stringify({
        from: state.contact.value,
        subject: state.title.value,
        text: `New Hacks/Hackers talk pitch

${state.pitch.value}`,
      }),
    }).then(res => {
      if (res.status === 200) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        bugsnagClient.notify(new Error(res.statusText));
      }
    });
  };

  const { state, handleOnChange, handleOnSubmit, disable, reset } = useForm(
    stateSchema,
    validationSchema,
    onSubmit
  );

  if (status === 'success') {
    return (
      <>
        <h2>Success</h2>
        <p>
          Thank you for sending your pitch, an event organiser will be in touch.
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleOnSubmit}>
      {status === 'error' ? (
        <FormError>
          Sorry, there has been an error submitting your pitch! Please try again
          or send it to the event organisers{' '}
          <a href="mailto:hello@quantsquills.com">via email</a>.
        </FormError>
      ) : null}
      <FormLabel htmlFor="title">Talk title</FormLabel>
      <FormInput
        name="title"
        type="text"
        value={state.title.value}
        onChange={handleOnChange}
      />
      {state.title.error && (
        <FormFieldError>{state.title.error}</FormFieldError>
      )}

      <FormLabel htmlFor="pitch">What's it all about?</FormLabel>
      <FormTextarea
        name="pitch"
        value={state.pitch.value}
        onChange={handleOnChange}
      ></FormTextarea>
      {state.pitch.error && (
        <FormFieldError>{state.pitch.error}</FormFieldError>
      )}

      <FormLabel htmlFor="contact">Email address</FormLabel>
      <FormInput
        name="contact"
        value={state.contact.value}
        onChange={handleOnChange}
      />
      {state.contact.error && (
        <FormFieldError>{state.contact.error}</FormFieldError>
      )}
      <SubmitButton disabled={status === 'sending' || disable} type="submit">
        Send
      </SubmitButton>
    </form>
  );
};

export default TalkPitchForm;
