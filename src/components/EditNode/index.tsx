import React, { Component, RefObject } from 'react'

interface Props {
  value: string
  onChange?: (value: string) => void
}

class EditNode extends Component<Props> {
  private ref: RefObject<HTMLSpanElement> = React.createRef()
  private lastHtml: string = ''

  constructor(props: Props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  private onChange(): void {
    const html = this.ref.current?.innerHTML ?? ''
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html)
    }
    this.lastHtml = html
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.value !== this.ref.current?.innerHTML
  }

  componentDidUpdate(): void {
    if (this.props.value !== this.ref.current?.innerHTML) {
      // @ts-ignore
      this.ref.current.innerHTML = this.props.value
    }
  }

  render(): JSX.Element {
    const { value } = this.props
    return (
      <span
        className="edit-node"
        contentEditable
        ref={this.ref}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={this.onChange}
        onBlur={this.onChange}
      />
    )
  }
}

export default EditNode
