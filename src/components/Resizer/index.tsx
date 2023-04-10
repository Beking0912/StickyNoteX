import { ReactNode, useRef } from 'react'
import { NoteProps } from '../../types/NodeType'
import { defaultSize } from '../../types/creator'
import './styles.scss'

type ResizerProps = {
  isSelected: boolean
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
  isSelected,
  style,
  className,
  children,
  onSave,
  onMouseDown,
}: ResizerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onResize = (event: any) => {
    event.stopPropagation()

    const { clientX: startX, clientY: startY } = event
    const direction = event.target.dataset.direction

    let props: NoteProps = { ...note }
    const onMove = (e: any) => {
      const { clientX, clientY } = e
      const deltaX = clientX - startX
      const deltaY = clientY - startY

      if (direction === 't' && note.h - deltaY >= defaultSize.h) {
        props = { ...note, y: note.y + deltaY, h: note.h - deltaY }
      } else if (direction === 'b' && note.h + deltaY >= defaultSize.h) {
        props = { ...note, h: note.h + deltaY }
      } else if (direction === 'l' && note.w - deltaX >= defaultSize.w) {
        props = { ...note, x: note.x + deltaX, w: note.w - deltaX }
      } else if (direction === 'r' && note.w + deltaX >= defaultSize.w) {
        props = { ...note, w: note.w + deltaX }
      }
      if (props.x && props.y && props.w && props.h) {
        ref.current!.style.width = `${props.w}px`
        ref.current!.style.height = `${props.h}px`
        ref.current!.style.left = `${props.x}px`
        ref.current!.style.top = `${props.y}px`
      }
    }
    const onMoveUp = () => {
      onSave(props as NoteProps)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMoveUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMoveUp)
  }

  return (
    <div
      ref={ref}
      className={`resizer-box ${className}`}
      style={style}
      onMouseDown={onMouseDown}
    >
      {isSelected &&
        handlers.map(([className, direction]) => (
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
