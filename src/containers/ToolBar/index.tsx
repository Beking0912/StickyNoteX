import { connect } from "react-redux";
import { createSelector } from "reselect";

import ToolBar from "./ToolBar";
import { getCurrentMode, getNoteList } from "../../actions/selectors";

const getAttributes = createSelector(
  [getCurrentMode, getNoteList],
  (mode, nodeList) => {
    return {
      mode,
      nodeList,
    };
  }
);

export default connect((state) => getAttributes(state))(ToolBar);
