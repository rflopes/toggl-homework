import React from 'react';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';

function App() {
  const [fileList, setFileList] = React.useState([]);

  return (
    <div>
      <FileSelector fileTypes='.txt' onChange={setFileList} />
      <FileList files={fileList} />
    </div>
  );
}

export default App;
