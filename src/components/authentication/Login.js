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
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginForm.prototype.renderLeft = function () {
        return [
            React.createElement("h1", { key: "title", className: "h3 mb-4 font-weight-normal text-right h1" }, "Hi! nice to see you again"),
            React.createElement("p", { key: "link", className: "font-weight-light a" },
                "No account yet? ",
                React.createElement(Link, { to: "create-account" }, "Create account"))
        ];
    };
    LoginForm.prototype.renderRight = function () {
        return [
            React.createElement(FormLogo, { key: "logo" }),
            React.createElement("form", { key: "form", className: "text-left" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "inputEmail" }, "Email"),
                    React.createElement("input", { type: "email", id: "inputEmail", className: "form-control font-weight-light mb-3 form-control-sm", required: true, autoFocus: true })),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "inputPassword" }, "Password"),
                    React.createElement("input", { type: "password", id: "inputPassword", className: "form-control font-weight-light mb-3 form-control-sm", required: true })),
                React.createElement("button", { className: "btn btn-lg btn-primary btn-block mb-3", type: "submit " }, "Log in"),
                React.createElement("p", { className: "font-weight-light" },
                    React.createElement(Link, { to: "forgot-password" }, "Forgot password?")))
        ];
    };
    LoginForm.prototype.render = function () {
        return [
            React.createElement(Particles, { key: "particles" }),
            React.createElement(FormContainer, { key: "formContainer", left: this.renderLeft(), right: this.renderRight() })
        ];
    };
    return LoginForm;
}(Component));
export default LoginForm;
//# sourceMappingURL=Login.js.map