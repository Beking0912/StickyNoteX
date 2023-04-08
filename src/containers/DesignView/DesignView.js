import { PureComponent } from "react";
import PropTypes from "prop-types";

// import EventListener from "../../helpers/EventListener";
import GridCanvas from "../../components/GirdCanvas";
import ToolBar from "../ToolBar";
import Note from "../../components/Note";

export default class DesignView extends PureComponent {
  static propTypes = {
    noteList: PropTypes.array,
    dispatch: PropTypes.func,
  };

  handleMouseDown = (e) => {
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch({ type: "entry:mouse:down", payload: { e } });
  };

  render() {
    const { noteList } = this.props;

    return (
      <div className="main" onMouseDown={this.handleMouseDown}>
        <GridCanvas/>
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
