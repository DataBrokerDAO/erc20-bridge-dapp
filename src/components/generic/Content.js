import React, { Component } from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

class Content extends Component {
  render() {
    return (
      <StyledContent className="container">{this.props.children}</StyledContent>
    );
  }
}

export default Content;
