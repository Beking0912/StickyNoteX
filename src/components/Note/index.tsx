import { PureComponent } from "react";
import { NoteProps } from "../../types/NodeType";
import "./styles.scss";

type NodeType = {
  note: NoteProps
}

export default class Note extends PureComponent<NodeType> {
    render() {
      const { note: { x, y, z, w, h } } = this.props;
      const styles = {
        top: y,
        left: x,
        zIndex: z,
        width: w,
        height: h
      }
  
      return (
        <div className="note" style={styles}>
          hello
        </div>
      );
    }
  }
  