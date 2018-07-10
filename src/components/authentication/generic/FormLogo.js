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
import Logo from '../../generic/Logo';
var FormLogo = /** @class */ (function (_super) {
    __extends(FormLogo, _super);
    function FormLogo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormLogo.prototype.render = function () {
        return (React.createElement("div", { className: "logo" },
            React.createElement(Logo, { size: 60 })));
    };
    return FormLogo;
}(Component));
export default FormLogo;
//# sourceMappingURL=FormLogo.js.map