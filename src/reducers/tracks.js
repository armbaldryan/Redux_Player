// @flow
const initialState = [
  {
    name: 'Mockingbird',
    id: 1,
    playlist: 1
  },
  {
    name: 'Hustling',
    id: 2,
    playlist: 2
  },
];
type IAppState = Array<{
    name: string,
    id: number,
    playlist: number
}>;
type IAppAction = {
    type: string,
    payload:{
        name: string,
        id: number,
        playlist: number
    }
};
export default function tracks(state:IAppState = initialState, action:IAppAction) {
  if (action.type === 'ADD_TRACK') {
    return [
      ...state,
      {
        ...action.payload,
        id: state.length > 0 ? (state[state.length - 1].id + 1) : 0
      }
    ];
  } else if (action.type === 'DELETE_TRACK') {
    return [
      ...state.filter((item) => item.id !== action.payload.id)
    ];
  }
  else if (action.type === 'EDIT_TRACK') {
    return [
      ...state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      })
    ];
  }
  return state;
}