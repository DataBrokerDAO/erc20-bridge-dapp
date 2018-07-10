/**
 * loading method that handles all react-loadable loaders.
 */
import React from 'react';
export default (function (props) {
    if (props.error) {
        return (React.createElement("div", { className: "loading" },
            "Error! ",
            React.createElement("button", { onClick: props.retry }, "Retry")));
    }
    else if (props.timedOut) {
        return (React.createElement("div", { className: "loading" },
            "Taking a long time... ",
            React.createElement("button", { onClick: props.retry }, "Retry")));
    }
    else if (props.pastDelay) {
        return React.createElement("div", { className: "loading" }, "Loading...");
    }
    else {
        return null;
    }
});
//# sourceMappingURL=Loading.js.map