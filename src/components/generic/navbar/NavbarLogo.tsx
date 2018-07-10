import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarLogo extends Component<
  { url: string; src: string; size: number },
  any
> {
  public render() {
    const { url, src, size } = this.props;
    return (
      <Link to={url}>
        <img className="img" src={src} height={size} alt="" />
      </Link>
    );
  }
}

export default NavbarLogo;
