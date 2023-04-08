import { getCurrentMode } from "./selectors";

export const noteEntry = {
  "entry:toggle:mode": ({ getState, dispatch }, { payload: { mode } }) => {
    const state = getState();
    const currentMode = getCurrentMode(state);
    const targetMode = currentMode === mode ? "" : mode;
    dispatch({ type: "note:toggle:mode", payload: { mode: targetMode } });
  },
};
