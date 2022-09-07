import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import React from 'react';
let ErrorBoundary;

if (process.env.BUGSNAG_ID) {
  const bugsnagClient = bugsnag(process.env.BUGSNAG_ID);
  bugsnagClient.use(bugsnagReact, React);
  ErrorBoundary = bugsnagClient.getPlugin('react');
} else {
  ErrorBoundary = ({ children }) => <>{children}</>;
}

const wrapRootElement = ({ element }) => (
  <ErrorBoundary>{element}</ErrorBoundary>
);

export default wrapRootElement;
