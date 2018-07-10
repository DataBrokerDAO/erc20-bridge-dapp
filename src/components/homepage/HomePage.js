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
import { connect } from 'react-redux';
import { setMessage } from '../../redux/appReducer';
import Content from '../generic/Content';
import Navigation from '../navigation/Navigation';
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.prototype.componentDidMount = function () {
        if (!this.props.message) {
            this.props.updateMessage("Hi, I'm from client!");
        }
    };
    HomePage.prototype.render = function () {
        return [
            React.createElement(Navigation, { key: "nav" }),
            React.createElement(Content, { key: "content" },
                React.createElement("p", null,
                    "Redux: ",
                    this.props.message))
        ];
    };
    return HomePage;
}(Component));
function mapStateToProps(state, ownProps) {
    return {
        message: state.app.message
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateMessage: function (txt) { return dispatch(setMessage(txt)); }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
//# sourceMappingURL=HomePage.js.map