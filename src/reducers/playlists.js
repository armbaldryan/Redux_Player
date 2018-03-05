const initialState = [
  {
    name: 'Eminem new Album',
    id: 1
  },
  {
    name: 'Rick Ross new Album',
    id: 2
  },
];
type IAppState = Array<{
    name: string,
    id: number
}>;
type IAppAction = {
    type: string,
    payload:{
        name: string,
        id: number,
    }
};
export default function playlists(state:IAppState = initialState, action:IAppAction) {
  if (action.type === 'ADD_PLAYLIST') {
    return [
      ...state,
      {
        name: action.payload,
        id: state.length > 0
          ? (state[state.length - 1].id + 1)
          : 1
      }
    ];
  } else if (action.type === 'DELETE_PLAYLIST') {
    return [
      ...state.filter((item) => item.id !== action.payload.id)
    ];
  }
  else if (action.type === 'EDIT_PLAYLIST') {
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