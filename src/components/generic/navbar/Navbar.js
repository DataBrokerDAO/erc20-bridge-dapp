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
import { NavLink } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import './Navbar.css';
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        var _a = this.props, _b = _a.dark, dark = _b === void 0 ? false : _b, _c = _a.gradient, gradient = _c === void 0 ? false : _c, items = _a.items, logo = _a.logo;
        return (React.createElement("nav", { className: "navbar navbar-expand-lg " + (dark ? 'navbar-dark bg-dark' : 'navbar-light bg-light') + " " + (gradient ? 'gradient' : '') },
            React.createElement("div", { className: "container" },
                React.createElement(NavbarLogo, { src: logo, size: 35, url: "/" }),
                React.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                    React.createElement("span", { className: "navbar-toggler-icon" })),
                React.createElement("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
                    React.createElement("ul", { className: "navbar-nav ml-auto" }, items.map(function (item, key) {
                        return (React.createElement("li", { key: key, className: "nav-item" },
                            React.createElement(NavLink, { exact: true, className: "nav-link", to: item.url }, item.name)));
                    }))))));
    };
    return Navbar;
}(Component));
export default Navbar;
//# sourceMappingURL=Navbar.js.map