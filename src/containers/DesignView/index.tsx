import { connect } from "react-redux";
import { createSelector } from "reselect";

import DesignView from "./DesignView";
import { getSelection, getNoteList, getCurrentMode, getHistoryColor } from "../../actions/selectors";

const getAttributes = createSelector(
  [getSelection, getNoteList, getCurrentMode, getHistoryColor],
  (selection, noteList, mode, historyColor) => {
    return {
      selection,
      noteList,
      mode,
      historyColor
    };
  }
);

export default connect((state) => getAttributes(state))(DesignView);
