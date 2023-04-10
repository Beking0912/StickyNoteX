import { ReactNode } from 'react'
import { NoteProps } from '../../types/NodeType'
import { defaultSize } from '../../types/creator'
import './styles.scss'

type ResizerProps = {
  note: NoteProps
  style?: React.CSSProperties
  className?: string
  children: ReactNode
  onSave: (note: NoteProps) => void
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const handlers = [
  ['box-top', 't'],
  ['box-right', 'r'],
  ['box-bottom', 'b'],
  ['box-left', 'l'],
]

export function Resizer({
  note,
  style,
  className,
  children,
  onSave,
  onMouseDown,
}: ResizerProps) {
  const onResize = (event: any) => {
    event.stopPropagation()

    const { clientX: startX, clientY: startY } = event
    const direction = event.target.dataset.direction
    const onMove = (e: any) => {
      const { clientX, clientY } = e
      const deltaX = clientX - startX
      const deltaY = clientY - startY

      if (
        note.h - deltaY >= defaultSize.h &&
        note.w - deltaX >= defaultSize.w
      ) {
        if (direction === 't') {
          onSave({ ...note, y: note.y + deltaY, h: note.h - deltaY })
        } else if (direction === 'b') {
          onSave({ ...note, h: note.h + deltaY })
        } else if (direction === 'l') {
          onSave({ ...note, x: note.x + deltaX, w: note.w - deltaX })
        } else if (direction === 'r') {
          onSave({ ...note, w: note.w + deltaX })
        }
      }
    }
    const onMoveUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMoveUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMoveUp)
  }

  return (
    <div
      className={`resizer-box ${className}`}
      style={style}
      onMouseDown={onMouseDown}
    >
      {handlers.map(([className, direction]) => (
        <span
          key={direction}
          className={className}
          data-direction={direction}
          onMouseDown={onResize}
        />
      ))}
      {children}
    </div>
  )
}
