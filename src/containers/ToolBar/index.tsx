import { connect } from "react-redux";
import { createSelector } from "reselect";

import ToolBar from "./ToolBar";
import { getCurrentMode, getNoteList, getHistoryColor } from "../../actions/selectors";

const getAttributes = createSelector(
  [getCurrentMode, getNoteList, getHistoryColor],
  (mode, nodeList, historyColor) => {
    return {
      mode,
      nodeList,
      historyColor
    };
  }
);

export default connect((state) => getAttributes(state))(ToolBar);
