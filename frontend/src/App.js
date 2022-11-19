import React from 'react';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';
import { parseFileData, readFile } from './services/file-reader';

function App() {
  const [fileList, setFileList] = React.useState([]);

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(fileList);

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
    } catch (error) {
      console.log(error);
    }
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
