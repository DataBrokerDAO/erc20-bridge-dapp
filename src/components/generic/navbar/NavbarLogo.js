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
import { Link } from 'react-router-dom';
var NavbarLogo = /** @class */ (function (_super) {
    __extends(NavbarLogo, _super);
    function NavbarLogo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavbarLogo.prototype.render = function () {
        var _a = this.props, url = _a.url, src = _a.src, size = _a.size;
        return (React.createElement(Link, { to: url },
            React.createElement("img", { className: "img", src: src, height: size, alt: "" })));
    };
    return NavbarLogo;
}(Component));
export default NavbarLogo;
//# sourceMappingURL=NavbarLogo.js.map