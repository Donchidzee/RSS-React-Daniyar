import React from 'react';

export default class ErrorTest extends React.Component {
  render() {
    throw new Error('Attention! Error!');
    return <div></div>;
  }
}
