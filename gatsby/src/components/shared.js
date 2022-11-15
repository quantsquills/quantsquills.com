import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

export const FormError = styled.p`
  color: rgb(163, 34, 0);
`;

export const FormFieldError = styled(FormError)`
  font-size: ${rhythm(0.5)};
  margin-bottom: 0;
`;

export const FormLabel = styled.label`
  margin-top: ${rhythm(0.5)};
  display: block;
`;

export const FormInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.2rem;
  display: block;
`;

export const FormTextarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.2rem;
  display: block;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 0.3rem;
  padding: 0.2rem 0.4rem;
  text-decoration: none;
  background: rgb(28, 160, 134);
  color: #fff;
  text-shadow: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  border: none;
`;
