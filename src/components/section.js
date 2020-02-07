import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import logo from '../assets/quants-quills-logo.svg';
import { rhythm, scale } from '../utils/typography';

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  max-width: 50rem;
  margin: ${rhythm(2)} auto 0;
  padding: 0 2rem;

  @media (max-width: 48rem) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const SectionTitle = styled.h1`
  width: 25%;
  margin-right: 5%;
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 1.45;
  margin-top: 0;

  @media (max-width: 48rem) {
    width: 100%;
    margin: auto;
  }
`;

export const SectionContent = styled.div`
  width: 70%;
  @media (max-width: 48rem) {
    width: 100%;
    margin: auto;
  }
`;

export const PageTitle = styled.div`
  width: 25%;
  margin-right: 5%;
  @media (max-width: 48rem) {
    width: 100%;
    margin: auto;
  }
`;

export const StandFirst = styled.p`
  font-size: ${rhythm(1)};
`;

export const SiteTitle = () => {
  const TitleLink = styled(Link)`
    text-decoration: none;
    text-shadow: none;
    background: none;
    color: rgba(0, 0, 0, 0.8);
    line-height: 1rem;
  `;

  const Img = styled.img`
    width: ${rhythm(5)};
    height: auto;
    margin-bottom: 0;
    display: block;
  `;

  return (
    <TitleLink to="/">
      <Img src={logo} alt={`Quants & Quills logo`} />
    </TitleLink>
  );
};

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
