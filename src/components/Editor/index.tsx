import { PureComponent, ReactNode } from 'react'
import EditNode from '../EditNode'
import { NoteProps } from '../../types/NodeType'

type Props = {
    isEditing: boolean
    note: NoteProps
    onSave: (note: NoteProps) => void
}

class Editor extends PureComponent<Props> {
  state = {
    html: this.props.note.text,
  }

  handleEditNote = (html: string) => {
    this.setState({ html })
  }

  handleSave = (text: string) => {  
    const { note, onSave } = this.props
    onSave({ ...note, text })
  }

  render(): ReactNode {
    const { isEditing } = this.props
    const { html } = this.state

    return !isEditing ? (
      <span className="edit-node" dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
      <EditNode value={html} onSave={this.handleSave} onChange={this.handleEditNote} />
    )
  }
}

export default Editor
