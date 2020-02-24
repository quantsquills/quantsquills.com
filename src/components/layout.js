import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import styles from './layout.module.scss';
import logo from '../assets/qq-logo.png';

export const Template = props => {
  const { location, children, className } = props;
  return (
    <div className={className}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <nav
          className={styles.nav}
          style={{
            padding: rhythm(1),
          }}
        >
          <Link to="/" style={{ backgroundImage: 'none' }}>
            <img
              src={logo}
              alt={`Quants & Quills logo`}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: rhythm(1.5),
              }}
            />
          </Link>
          <ul className={styles.menu}>
            <li>
              <a href="https://twitter.com/hackshackersbne">@HacksHackersBNE</a>
            </li>
          </ul>
        </nav>

        <section className={styles.sponsors} style={{ padding: rhythm(1) }}>
          <h1>Supported by</h1>
          <ul>
            <li>
              <a href="https://www.abc.net.au/news/">ABC News</a>
            </li>
            <li>
              <a href="https://www.thoughtworks.com">ThoughtWorks</a>
            </li>
          </ul>
        </section>
      </div>
      <div
        style={{
          padding: rhythm(1),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Template;
