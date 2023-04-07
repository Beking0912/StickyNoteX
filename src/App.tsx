import GridCanvas from './components/GirdCanvas';
import ToolBar from './ToolBar';

import './App.css';

function App() {
  return (
    <div className='main'>
      <GridCanvas/>
      <ToolBar/>
      <div></div>
    </div>
  );
}

export default App;
