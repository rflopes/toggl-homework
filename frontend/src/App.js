import React from 'react';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';
import { parseFileData, readFile } from './services/file-reader';

const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

function App() {
  const [fileList, setFileList] = React.useState([]);

  const [status, setStatus] = React.useState(Status.IDLE);

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(fileList);

    setStatus(Status.LOADING);

    const promises = [];

    for (const file of fileList) {
      promises.push(readFile(file));
    }

    try {
      const data = await Promise.all(promises);
      console.log({ data });

      const emailAddresses = data
        .map(fileData => parseFileData(fileData.data))
        .flat()
        .filter(Boolean);

      console.log({ emailAddresses });

      setStatus(Status.SUCCESS);
    } catch (error) {
      setStatus(Status.ERROR);
    }
  };

  return (
    <div>
      {status}
      <form onSubmit={handleFormSubmit}>
        <FileSelector fileTypes='.txt' onChange={setFileList} />
        <FileList files={fileList} />
        <button disabled={!fileList?.length}>Send emails</button>
      </form>
    </div>
  );
}

export default App;
