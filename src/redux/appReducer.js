var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var initialState = {
    message: null
};
export var setMessage = function (messageText) { return ({
    type: 'SET_MESSAGE',
    message: messageText
}); };
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'SET_MESSAGE':
            return __assign({}, state, { message: action.message });
        default:
            return state;
    }
};
//# sourceMappingURL=appReducer.js.map