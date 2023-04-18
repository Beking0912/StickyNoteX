import { MouseEvent, PureComponent } from 'react'
import { NoteProps } from '../../types/NodeType'
import { Resizer } from '../Resizer'
import EditNode from '../EditNode'
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
  state = {
    html: this.props.note.text,
  }

  // handleEdit = (e: any) => {
  //   const { note, isEditing, onSave } = this.props
  //   if (!isEditing) return
  //   onSave({ ...note, text: e.target.value })
  // }

  handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation()

    const { isEditing, isSelected, note, onSave, onSelect } = this.props
    console.log('mouse down', isEditing)

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

  handleDragNote = (event: MouseEvent) => {
    const { note, onSave } = this.props
    const { clientX: startX, clientY: startY } = event
    this.setState({ isDragging: true })

    const onMove = (e: any) => {
      const { clientX, clientY } = e
      const deltaX = clientX - startX
      const deltaY = clientY - startY
      onSave({ ...note, x: note.x + deltaX, y: note.y + deltaY })
    }

    const onMoveUp = () => {
      this.setState({ isDragging: false })
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMoveUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMoveUp)
  }

  handleEditNote = (html: string) => {
    this.setState({ html })
    const { note, isEditing, onEdit } = this.props
    if (!isEditing) onEdit(note.nid)
  }

  render() {
    const { isEditing, isSelected, note, onSave } = this.props
    const { x, y, z, w, h, color } = note
    const { html } = this.state

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
      >
        {/* {isEditing ? (
          <textarea
            value={text}
            onInput={this.handleEdit}
            placeholder="Type something..."
          ></textarea>
        ) : (
          <textarea
            readOnly
            value={text}
            placeholder="Type something..."
          ></textarea>
        )} */}
        <EditNode
          value={html}
          onChange={this.handleEditNote}
        />
      </Resizer>
    )
  }
}
