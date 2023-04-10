import cx from 'classnames'
import './styles.scss'

type ColorSelectorProps = {
  activeColor: string
  onSaveColor: (color: string) => void
}

const colorList = ['#fffff3', '#cbe86b', '#fbd14b', '#80d4f6', '#f1bbba']

export function ColorSelector({
  activeColor,
  onSaveColor,
}: ColorSelectorProps) {
  const handleColorClick = (e: any) => {
    onSaveColor(e.target.dataset.color)
  }
  const handleMouseDown = (e: any) => {
    e.stopPropagation()
  }
  return (
    <div className="color-selector" onMouseDown={handleMouseDown}>
      {colorList.map((color) => (
        <span
          className={cx({ selected: color === activeColor })}
          key={color}
          data-color={color}
          style={{ backgroundColor: color }}
          onClick={handleColorClick}
        />
      ))}
    </div>
  )
}
