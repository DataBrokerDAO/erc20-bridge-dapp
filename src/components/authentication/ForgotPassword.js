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
import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';
import Particles from './generic/ParticlesBackground';
import './Authentication.css';
var ForgotPasswordForm = /** @class */ (function (_super) {
    __extends(ForgotPasswordForm, _super);
    function ForgotPasswordForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgotPasswordForm.prototype.renderLeft = function () {
        return [
            React.createElement("h1", { key: "title", className: "h3 mb-4 font-weight-normal text-right" }, "Forgot your password?"),
            React.createElement("p", { key: "helpMessage", className: "font-weight-light text-right p" }, "No worries! We can get you into your account again. We'll send you an email to reset your password."),
            React.createElement("p", { key: "link", className: "font-weight-light a" },
                "Remember your password? ",
                React.createElement(Link, { to: "login" }, "Log in"))
        ];
    };
    ForgotPasswordForm.prototype.renderRight = function () {
        return [
            React.createElement(FormLogo, { key: "logo" }),
            React.createElement("form", { key: "form", className: "text-left" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "inputEmail" }, "Email"),
                    React.createElement("input", { type: "email", id: "inputEmail", className: "form-control font-weight-light mb-3 form-control-sm", required: true, autoFocus: true })),
                React.createElement("button", { className: "btn btn-lg btn-primary btn-block mb-3", type: "submit " }, "Send email"))
        ];
    };
    ForgotPasswordForm.prototype.render = function () {
        return [
            React.createElement(Particles, { key: "particles" }),
            React.createElement(FormContainer, { key: "formContainer", left: this.renderLeft(), right: this.renderRight() })
        ];
    };
    return ForgotPasswordForm;
}(Component));
export default ForgotPasswordForm;
//# sourceMappingURL=ForgotPassword.js.map