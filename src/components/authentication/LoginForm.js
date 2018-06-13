import React, { Component } from 'react';
import styled from 'styled-components';

import ParticlesBackground from '../generic/ParticlesBackground';

const StyledContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
`;

const StyledLeft = styled.div`
  background-color: #f4f4f4;
  padding: 40px;
`;

const StyledAccountLink = styled.p`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;

const StyledTitle = styled.h1`
  height: 120px;
`;

const StyledRight = styled.div`
  background-color: #fff;
  padding: 40px;
`;

class LoginForm extends Component {
  render() {
    return (
      <StyledContainer className="container w-40">
        <div className="row">
          <StyledLeft className="col-sm d-xs-none d-sm-block">
            <StyledTitle className="h3 mb-4 font-weight-normal text-right">
              Hi! nice to see you again
            </StyledTitle>
            <StyledAccountLink className="font-weight-light">
              No account yet? <a href="/dapp/create-account">Create account</a>
            </StyledAccountLink>
          </StyledLeft>
          <StyledRight className="col-sm">
            <h1 className="h1 mb-5 font-weight-normal text-primary">
              CertiMint
            </h1>
            <form className="text-left">
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control font-weight-light mb-3 form-control-sm"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control font-weight-light mb-3 form-control-sm"
                  required
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block mb-3"
                type="submit "
              >
                Log in
              </button>
              <p className="font-weight-light">
                <a href="/dapp/forgot-password">Forgot password?</a>
              </p>
            </form>
          </StyledRight>
        </div>
      </StyledContainer>
    );
  }
}

export default LoginForm;
