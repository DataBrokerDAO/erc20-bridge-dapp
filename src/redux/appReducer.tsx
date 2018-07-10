import { AnyAction } from 'redux';

export interface IAppState {
  message: string | null;
}

const initialState: IAppState = {
  message: null
};

export const setMessage = (messageText: string) => ({
  type: 'SET_MESSAGE',
  message: messageText
});

export const reducer = (state = initialState, action: AnyAction) => {
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
