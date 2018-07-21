import { AnyAction } from 'redux';

type Payload = any;

export interface IAction extends AnyAction {
  payload: Payload;
}

export interface IActionMap<State> {
  [key: string]: (state: State, payload: Payload) => State; 
}

export function createReducer <State>(actionMap: IActionMap<State>, initialState: State) {
  return (state: State = initialState, action: IAction) => {
    const type = action.type;
    if (actionMap[type]) {
      return actionMap[type](state, action.payload);
    }
    return state;
  }
}

export const createContext = (ctx: string) => (type: string) => ctx + '/' + type;