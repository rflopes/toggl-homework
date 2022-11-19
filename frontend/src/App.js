import React from 'react';
import FileSelector from './components/FileSelector';

function App() {
  return (
    <div>
      <FileSelector fileTypes='.txt' onChange={console.log} />
    </div>
  );
}

export default App;
