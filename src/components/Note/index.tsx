import { MouseEvent, PureComponent } from "react";
import { NoteProps } from "../../types/NodeType";
import "./styles.scss";

type NodeType = {
  isSelected: boolean;
  note: NoteProps;
  onSave: (note: NoteProps) => void;
  onSelect: (nid: string) => void;
};

export default class Note extends PureComponent<NodeType> {
  handleEdit = (e: any) => {
    const { note, onSave } = this.props;
    const text = e.target.value;
    onSave({ ...note, text });
  };

  handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    const { onSelect, note } = this.props;  
    onSelect(note.nid);
  }

  render() {
    const {
      isSelected,
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
