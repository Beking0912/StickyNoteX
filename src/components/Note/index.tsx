import { MouseEvent, PureComponent } from "react";
import { NoteProps } from "../../types/NodeType";
import "./styles.scss";

type NodeType = {
  note: NoteProps;
  onSaveNote: (note: NoteProps) => void;
  onSelect: () => void;
};

export default class Note extends PureComponent<NodeType> {
  handleEdit = (e: any) => {
    const { note, onSaveNote } = this.props;
    const text = e.target.value;
    onSaveNote({ ...note, text });
  };

  handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    this.props.onSelect();
  }

  render() {
    const {
      note: { x, y, z, w, h, text },
    } = this.props;
    const styles = {
      top: y,
      left: x,
      zIndex: z,
      width: w,
      height: h,
    };

    return (
      <div className="note" style={styles} onMouseDown={this.handleClick}>
        <textarea
          className="note-content"
          value={text}
          onInput={this.handleEdit}
          placeholder="Type something..."
        ></textarea>
      </div>
    );
  }
}
