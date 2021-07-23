/* eslint-disable react/no-unused-state */
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ appName }) => (
  <div>
    <h1>{appName}</h1>
    <hr />
    <h2>Front-end capstone project for Hack Reactor</h2>
  </div>
);

App.propTypes = {
  appName: PropTypes.string.isRequired,
};

ReactDOM.render(
  <App appName="Project Catwalk" />,
  document.getElementById('app'),
);
