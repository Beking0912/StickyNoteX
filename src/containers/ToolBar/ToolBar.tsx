import { PureComponent } from "react";
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

  toggleNoteMode = (e) => {
    e.stopPropagation();
    const { dispatch } = this.props
    dispatch({ type: 'entry:toggle:mode', payload: { mode: 'note' } })
  }

  render() {
    const { mode } = this.props;
    const isCreateNote = mode === "note";
    return (
      <div className="bar-container">
        <div>{isCreateNote ? "note mode" : ""}</div>
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
