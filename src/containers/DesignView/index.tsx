import { connect } from "react-redux";
import { createSelector } from "reselect";

import DesignView from "./DesignView";
import { getNoteList, getCurrentMode } from "../../actions/selectors";

const getAttributes = createSelector(
  [getNoteList, getCurrentMode],
  (noteList, mode) => {
    return {
      noteList,
      mode,
    };
  }
);

export default connect((state) => getAttributes(state))(DesignView);
