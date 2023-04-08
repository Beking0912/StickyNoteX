const initialState = {
  mode: "",
  selection: [],
  noteList: [],
};

const mode = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "note:update:state":
      const { noteList } = payload;
      return { ...state, noteList };

    case "selection:update:state":
      const { selection } = payload;
      return { ...state, selection };

    case "note:toggle:mode":
      const { mode } = payload;
      return { ...state, mode };

    case "note:add:state":
      const { note } = payload;
      return { ...state, noteList: [...state.noteList, note] };

    default:
      return state;
  }
};

export default mode;
