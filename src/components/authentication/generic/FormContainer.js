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
var FormContainer = /** @class */ (function (_super) {
    __extends(FormContainer, _super);
    function FormContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormContainer.prototype.render = function () {
        var _a = this.props, left = _a.left, right = _a.right, rightColored = _a.rightColored;
        return (React.createElement("div", { className: "container auth" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-sm d-xs-none d-sm-block left", style: {
                        backgroundColor: rightColored ? '#fff' : '#f5f5f5'
                    } }, left),
                React.createElement("div", { className: "col-sm right", style: {
                        backgroundColor: rightColored ? '#f5f5f5' : '#fff'
                    } }, right))));
    };
    return FormContainer;
}(Component));
export default FormContainer;
//# sourceMappingURL=FormContainer.js.map