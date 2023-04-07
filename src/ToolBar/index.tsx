import Icon from "../components/Icon";
import './styles.scss';

function ToolBar() {
  return (
    <div className="bar-container">
      <div className="bar-icon">
        <Icon iconName="toolbar/note" className="note-icon"/>
      </div>
    </div>
  );
}

export default ToolBar;
