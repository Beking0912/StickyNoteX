import { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// import EventListener from "../../helpers/EventListener";
import GridCanvas from "../../components/GirdCanvas";
import Note from "../../components/Note";
import ToolBar from "../ToolBar";

import "./styles.scss";

export default class DesignView extends PureComponent {
  static propTypes = {
    mode: PropTypes.string,
    noteList: PropTypes.array,
    dispatch: PropTypes.func,
  };

  handleMouseDown = (e) => {
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch({ type: "entry:mouse:down", payload: { e } });
  };

  render() {
    const { mode, noteList } = this.props;
    const isCreateNote = mode === "note";

    return (
      <div
        className={cx("design-view", { active: isCreateNote })}
        onMouseDown={this.handleMouseDown}
      >
        <GridCanvas />
        <ToolBar />

        {noteList.map((note) => (
          <Note key={note.nid} note={note} />
        ))}

        {/* <EventListener
          target={document}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onMouseMove={handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={handleMouseUp}
        /> */}
      </div>
    );
  }
}
