var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import Navbar from '../generic/navbar/Navbar';
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navigation.prototype.render = function () {
        var items = [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Login',
                url: '/authenticate/login'
            }
            // TODO: add your navigation items here
        ];
        return (React.createElement(Navbar, { dark: true, gradient: true, items: items, logo: "images/logo_certimint_white.svg" }));
    };
    return Navigation;
}(Component));
export default Navigation;
//# sourceMappingURL=Navigation.js.map