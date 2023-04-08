import { connect } from "react-redux";
import { createSelector } from "reselect";

import DesignView from "./DesignView";
import { getSelection, getNoteList, getCurrentMode } from "../../actions/selectors";

const getAttributes = createSelector(
  [getSelection, getNoteList, getCurrentMode],
  (selection, noteList, mode) => {
    return {
      selection,
      noteList,
      mode,
    };
  }
);

export default connect((state) => getAttributes(state))(DesignView);
