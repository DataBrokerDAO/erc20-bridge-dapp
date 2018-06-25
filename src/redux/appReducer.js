const initialState = {
  message: null
};

export const setMessage = messageText => ({
  type: 'SET_MESSAGE',
  message: messageText
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};
