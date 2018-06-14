import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class NavbarLogo extends Component {
  render() {
    const StyledImage = styled.img`
      margin: 7px 0;
    `;

    const { url, src, size } = this.props;
    return (
      <Link to={url}>
        <StyledImage src={src} height={size} />
      </Link>
    );
  }
}

export default NavbarLogo;
