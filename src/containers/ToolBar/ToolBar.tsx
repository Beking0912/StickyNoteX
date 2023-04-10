import { MouseEvent, PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Icon from '../../components/Icon'
import { ColorSelector } from '../../components/ColorSelector'
import './styles.scss'

type ToolBarState = {}

export default class ToolBar extends PureComponent<any, ToolBarState> {
  static propTypes = {
    mode: PropTypes.string,
    noteList: PropTypes.array,
    historyColor: PropTypes.string,
    dispatch: PropTypes.func,
  }

  toggleNoteMode = (e: MouseEvent) => {
    e.stopPropagation()
    const { dispatch } = this.props
    dispatch({ type: 'entry:toggle:mode', payload: { mode: 'note' } })
  }

  toggleSelectMode = (e: MouseEvent) => {
    e.stopPropagation()
    const { mode, dispatch } = this.props
    if (mode === '') return
    dispatch({ type: 'note:toggle:mode', payload: { mode: '' } })
  }

  handleSaveColor = (color: string) => {
    this.props.dispatch({ type: 'entry:update:color', payload: { color } })
  }

  render() {
    const { mode, historyColor } = this.props
    const isCreateNote = mode === 'note'
    return (
      <div className="bar-container">
        <div
          className={cx('bar-icon', { active: !isCreateNote })}
          onMouseDown={this.toggleSelectMode}
        >
          <Icon iconName="toolbar/select" className="note-icon" />
        </div>

        <div
          className={cx('bar-icon', { active: isCreateNote })}
          onMouseDown={this.toggleNoteMode}
        >
          <Icon iconName="toolbar/note" className="note-icon" />
        </div>
        {isCreateNote && (
          <ColorSelector
            activeColor={historyColor}
            onSaveColor={this.handleSaveColor}
          />
        )}
      </div>
    )
  }
}
