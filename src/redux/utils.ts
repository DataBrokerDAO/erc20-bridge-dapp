import { AnyAction } from 'redux';
import { IEventAction } from './transfer';

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

export const eventFilter = (actionType: string, eventName: string, filter = {}) => (action: AnyAction) => {
    if (action.type !== actionType) {
        return false;
    }
    const { payload } = (action as IEventAction);
    if (payload.event !== eventName) {
        return false;
    }
    const filterMatches = !Object.keys(filter)
        .find(key => filter[key] !== payload.returnValues[key])
    return filterMatches;
}
