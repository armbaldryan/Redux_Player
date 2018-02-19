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
]

export default function tracks(state = initialState, action) {
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
      ...state.filter((item, index) => item.id !== action.payload.id)
    ];
  }
  else if (action.type === 'EDIT_TRACK') {
    return [
      ...state.map((item, index) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      })
    ];
  }
  return state;
}