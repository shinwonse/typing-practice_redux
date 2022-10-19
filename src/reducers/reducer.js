import inputState from '../store';
import { INPUT } from '../actions/action';

const reducer = (state = inputState, action) => {
  switch (action.type) {
    case INPUT:
      return {
        text: action.text,
      };
    default:
      return state;
  }
};

export default reducer;
