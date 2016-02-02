import {fromJS} from 'immutable';
import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';

const SET_DATE = 'main/SET_DATE';
const FETCH_DATE = 'main/FETCH_DATE';

const initialState = fromJS({});

export default function reducer(state = initialState, action = {}) {
  if (action.error === true) {
    return state;
  }

  switch (action.type) {
    case SET_DATE:
      return state.set('date', action.payload);
    case FETCH_DATE:
      return state.setIn(['data', action.meta], action.payload);
    default:
      return state;
  }
}

export const setDate = createAction(SET_DATE, date => date);
export const fetchDate = createAction(FETCH_DATE, async date => {
  return await fetch(`http://localhost:3000/api/${date}`)
    .then(response => {
      return fromJS(response.json());
    });
}, date => date);
