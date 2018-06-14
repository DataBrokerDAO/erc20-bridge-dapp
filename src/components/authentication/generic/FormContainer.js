import React, { Component } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  max-width: 800px;
`;

const StyledLeft = styled.div`
  padding: 40px;
`;

const StyledRight = styled.div`
  padding: 40px;
`;

export default class FormContainer extends Component {
  render() {
    const { left, right, rightColored } = this.props;

    return (
      <StyledContainer className="container">
        <div className="row">
          <StyledLeft
            className="col-sm d-xs-none d-sm-block"
            style={{
              backgroundColor: rightColored ? '#fff' : '#f5f5f5'
            }}
          >
            {left}
          </StyledLeft>
          <StyledRight
            className="col-sm"
            style={{
              backgroundColor: rightColored ? '#f5f5f5' : '#fff'
            }}
          >
            {right}
          </StyledRight>
        </div>
      </StyledContainer>
    );
  }
}
