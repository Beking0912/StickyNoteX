import { connect } from "react-redux";
import { createSelector } from "reselect";

import DesignView from "./DesignView";
import { getNoteList } from "../../actions/selectors";

const getAttributes = createSelector([getNoteList], (noteList) => {
  return {
    noteList,
  };
});

export default connect((state) => getAttributes(state))(DesignView);
