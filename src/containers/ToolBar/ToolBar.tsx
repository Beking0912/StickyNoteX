import { MouseEvent, PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Icon from "../../components/Icon";
import "./styles.scss";

export default class ToolBar extends PureComponent<any> {
  static propTypes = {
    mode: PropTypes.string,
    noteList: PropTypes.array,
    dispatch: PropTypes.func,
  };

  toggleNoteMode = (e: MouseEvent) => {
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch({ type: "entry:toggle:mode", payload: { mode: "note" } });
  };

  toggleSelectMode = (e: MouseEvent) => {
    e.stopPropagation();
    const { mode, dispatch } = this.props;
    if (mode === "") return;
    dispatch({ type: "note:toggle:mode", payload: { mode: "" } });
  };

  render() {
    const { mode } = this.props;
    const isCreateNote = mode === "note";
    return (
      <div className="bar-container">
        <div
          className={cx("bar-icon", { active: !isCreateNote })}
          onMouseDown={this.toggleSelectMode}
        >
          <Icon iconName="toolbar/select" className="note-icon" />
        </div>

        <div
          className={cx("bar-icon", { active: isCreateNote })}
          onMouseDown={this.toggleNoteMode}
        >
          <Icon iconName="toolbar/note" className="note-icon" />
        </div>
      </div>
    );
  }
}
