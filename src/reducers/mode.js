const initialState = {
  mode: '',
  noteList: [],
};

const mode = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'note:update:state':
      return Object.assign({}, state, payload);

    case 'note:toggle:mode':
      const { mode } = payload;
      return { ...state, mode };

    case 'note:add:state':
      const { note } = payload;
      return { ...state, noteList: [...state.noteList, note] };

    default:
      return state;
  }
};

export default mode;