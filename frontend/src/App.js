import React from 'react';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';

function App() {
  const [fileList, setFileList] = React.useState([]);

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(fileList);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FileSelector fileTypes='.txt' onChange={setFileList} />
        <FileList files={fileList} />
        <button disabled={!fileList?.length}>Send emails</button>
      </form>
    </div>
  );
}

export default App;
