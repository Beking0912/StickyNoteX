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
  ['box-top-left', 'tl'],
  ['box-top-right', 'tr'],
  ['box-bottom-right', 'br'],
  ['box-bottom-left', 'bl'],
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

  const isValid = ({ w = defaultSize.w, h = defaultSize.h }) => w >= defaultSize.w && h >= defaultSize.h

  const onResize = (event: any) => {
    event.stopPropagation()

    const { clientX: startX, clientY: startY } = event
    const direction = event.target.dataset.direction

    let props = { ...note }
    const onMove = (e: any) => {
      const { clientX, clientY } = e
      const deltaX = clientX - startX
      const deltaY = clientY - startY

      if (direction === 't' && isValid({ h: note.h - deltaY })) {
        ;[props.y, props.h] = [note.y + deltaY, note.h - deltaY]
      } else if (direction === 'b' && isValid({ h: note.h + deltaY })) {
        props.h = note.h + deltaY
      } else if (direction === 'l' && isValid({ w: note.w - deltaX })) {
        ;[props.x, props.w] = [note.x + deltaX, note.w - deltaX]
      } else if (direction === 'r' && isValid({ w: note.w + deltaX })) {
        props.w = note.w + deltaX
      } else if (direction === 'tl' && isValid({ w: note.w - deltaX, h: note.h - deltaY })) {
        ;[props.x, props.y] = [note.x + deltaX, note.y + deltaY]
        ;[props.w, props.h] = [note.w - deltaX, note.h - deltaY]
      } else if (direction === 'tr' && isValid({ w: note.w + deltaX, h: note.h - deltaY })) {
        props.y = note.y + deltaY
        ;[props.w, props.h] = [note.w + deltaX, note.h - deltaY]
      } else if (direction === 'br' && isValid({ w: note.w + deltaX, h: note.h + deltaY })) {
        ;[props.w, props.h] = [note.w + deltaX, note.h + deltaY]
      } else if (direction === 'bl' && isValid({ w: note.w - deltaX, h: note.h + deltaY })) {
        props.x = note.x + deltaX
        ;[props.w, props.h] = [note.w - deltaX, note.h + deltaY]
      }

      if (props.x && props.y && props.w && props.h) {
        ref.current!.style.width = `${props.w}px`
        ref.current!.style.height = `${props.h}px`
        ref.current!.style.left = `${props.x}px`
        ref.current!.style.top = `${props.y}px`
      }
    }
    const onMoveUp = () => {
      onSave({ ...note, ...props })
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
