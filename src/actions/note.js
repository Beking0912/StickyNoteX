import { getCurrentMode, getNoteList, getSelection } from "./selectors";

export const noteEntry = {
  "entry:toggle:mode": ({ getState, dispatch }, { payload: { mode } }) => {
    const state = getState();
    const currentMode = getCurrentMode(state);
    const targetMode = currentMode === mode ? "" : mode;
    dispatch({ type: "note:toggle:mode", payload: { mode: targetMode } });
  },
  "entry:update:note": ({ getState, dispatch }, { payload: { note } }) => {
    const state = getState();
    const currentList = getNoteList(state);

    const indexToUpdate = currentList.findIndex(obj => obj.nid === note.nid);
    if (indexToUpdate === -1) return;

    currentList[indexToUpdate] = note;
    dispatch({ type: "note:update:state", payload: { noteList: [...currentList] } });
  },
  "entry:update:selection": ({ getState, dispatch }, { payload: { id } }) => {
    const state = getState();
    const selection = getSelection(state);

    if (selection.includes(id)) return;
    dispatch({ type: "selection:update:state", payload: { selection: [id] } });
  }
};
