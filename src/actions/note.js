import getInitialData from "../types/creator";
import { getCurrentMode } from "./selectors";

export const noteEntry = {
  "entry:toggle:mode": ({ getState, dispatch }, { payload: { mode } }) => {
    const state = getState();
    const currentMode = getCurrentMode(state);
    const targetMode = currentMode === mode ? "" : mode;
    dispatch({ type: "note:toggle:mode", payload: { mode: targetMode } });
  },
  "entry:note:create": ({ getState, dispatch }, { payload: { e } }) => {
    const { clientX, clientY } = e;
    const props = { x: clientX, y: clientY };
    const newNote = getInitialData('note', props);

    dispatch({ type: "note:add:state", payload: { note: newNote } });
  },
  "entry:mouse:down": ({ getState, dispatch }, { payload: { e } }) => {
    const state = getState();
    const currentMode = getCurrentMode(state);
    const isNoteMode = currentMode === 'note';

    if (isNoteMode) {
      dispatch({ type: "entry:note:create", payload: { e } });
    }
  },
};
