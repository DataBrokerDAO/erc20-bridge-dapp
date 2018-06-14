import React, { Component } from 'react';
import styled from 'styled-components';

import Logo from '../../generic/Logo';

const StyledLogoWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class FormLogo extends Component {
  render() {
    return (
      <StyledLogoWrapper>
        <Logo size={60} />
      </StyledLogoWrapper>
    );
  }
}
