import { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// import EventListener from "../../helpers/EventListener";
import GridCanvas from "../../components/GirdCanvas";
import Note from "../../components/Note";
import ToolBar from "../ToolBar";

import getInitialData, { defaultSize } from "../../types/creator";
import { getCreatingDirection } from "../../helpers/utils";

import "./styles.scss";

export default class DesignView extends PureComponent {
  static propTypes = {
    mode: PropTypes.string,
    noteList: PropTypes.array,
    selection: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.activeDivRef = createRef();
    this.state = {
      isEditing: null,
      tempNote: {},
    };
  }

  handleEditNote = (isEditing) => this.setState({ isEditing })

  handleMouseDown = (e) => {
    e.stopPropagation();
    const { mode, dispatch } = this.props;
    dispatch({ type: "selection:update:state", payload: { selection: [] } });
    this.handleEditNote(null);

    if (mode === "note") {
      this.handleNoteCreate(e);
    }
  };

  handleNoteCreate = (event) => {
    const { clientX: startX, clientY: startY } = event;

    const activeDiv = document.createElement("div");
    activeDiv.id = "createIn";
    activeDiv.style.backgroundColor = `#c4bebe80`;
    activeDiv.style.position = "absolute";
    activeDiv.style.zIndex = 100;
    this.activeDivRef.current = activeDiv;
    document.body.appendChild(activeDiv);

    const onMove = (e) => {
      const activeDiv = this.activeDivRef.current;
      if (!activeDiv) return;

      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const { x, y } = getCreatingDirection({
        x: deltaX,
        y: deltaY,
        startX,
        startY,
        clientX,
        clientY,
      });

      const w = Math.abs(deltaX);
      const h = Math.abs(deltaY);
      this.setState({ tempNote: { x, y, w, h } });

      activeDiv.style.left = `${x}px`;
      activeDiv.style.top = `${y}px`;
      activeDiv.style.width = `${w}px`;
      activeDiv.style.height = `${h}px`;
    };

    const onMoveUp = () => {
      const activeDiv = document.getElementById("createIn");
      if (!activeDiv) return;

      document.body.removeChild(activeDiv);

      const { tempNote } = this.state;
      const noteProps = {
        x: Math.max(startX, tempNote.x ?? 0),
        y: Math.max(startY, tempNote.y ?? 0),
        w: Math.max(defaultSize.w, tempNote.w ?? 0),
        h: Math.max(defaultSize.h, tempNote.h ?? 0),
      };

      const note = getInitialData("note", noteProps);
      this.props.dispatch({ type: "note:add:state", payload: { note } });

      this.setState({ tempNote: {} });

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onMoveUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onMoveUp);
  };

  handleSaveNote = (note) => {
    this.props.dispatch({ type: "entry:update:note", payload: { note } });
  };

  handleSelectNote = (id) => {
    this.props.dispatch({ type: "note:toggle:mode", payload: { mode: "" } });
    this.props.dispatch({ type: "entry:update:selection", payload: { id } });
  };

  render() {
    const { isEditing } = this.state;
    const { mode, noteList, selection } = this.props;
    const isCreateNote = mode === "note";

    return (
      <div
        className={cx("design-view", { active: isCreateNote })}
        onMouseDown={this.handleMouseDown}
      >
        <GridCanvas />
        <ToolBar />

        {noteList.map((note) => (
          <Note
            key={note.nid}
            note={note}
            isEditing={isEditing === note.nid}
            isSelected={selection.includes(note.nid)}
            onSelect={this.handleSelectNote}
            onSave={this.handleSaveNote}
            onEdit={this.handleEditNote} 
          />
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
