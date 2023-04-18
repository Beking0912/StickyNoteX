import { MouseEvent, PureComponent } from 'react'
import { NoteProps } from '../../types/NodeType'
import { Resizer } from '../Resizer'
import Editor from '../Editor'
import cx from 'classnames'
import './styles.scss'

type NoteType = {
  isEditing: boolean
  isSelected: boolean
  note: NoteProps
  onSave: (note: NoteProps) => void
  onSelect: (nid: string) => void
  onEdit: (nid: string | null) => void
}

export default class Note extends PureComponent<NoteType> {
  handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation()

    const { isEditing, isSelected, note, onSave, onSelect } = this.props

    if (isSelected && isEditing) return
    if (!isSelected) onSelect(note.nid)

    const { clientX: startX, clientY: startY } = e

    const onMove = (event: any) => {
      const { clientX, clientY } = event
      const deltaX = clientX - startX
      const deltaY = clientY - startY
      onSave({ ...note, x: note.x + deltaX, y: note.y + deltaY })
    }

    const onMoveUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMoveUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMoveUp)
  }

  handleEditNote = (html: string) => {
    this.setState({ html })
  }

  handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    const { isEditing, note, onEdit } = this.props
    if (!isEditing) onEdit(note.nid)
  }

  render() {
    const { isEditing, isSelected, note, onSave } = this.props
    const { x, y, z, w, h, color } = note

    const className = cx(
      'note',
      { 'is-selected': isSelected },
      { 'is-editing': isEditing }
    )
    const styles = {
      top: y,
      left: x,
      zIndex: z,
      width: w,
      height: h,
      backgroundColor: color,
    }

    return (
      <Resizer
        className={className}
        style={styles}
        note={note}
        isSelected={isSelected}
        onSave={onSave}
        onMouseDown={this.handleMouseDown}
        onDoubleClick={this.handleDoubleClick}
      >
      <Editor isEditing={isEditing} note={note} onSave={onSave}/>
      </Resizer>
    )
  }
}
