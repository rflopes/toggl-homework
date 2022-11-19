import React from 'react';
import CustomError from './components/CustomError';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';
import { sendEmailAddresses } from './services/email-sender';
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
  const [error, setError] = React.useState(null);
  const formRef = React.useRef(null);

  const handleFormSubmit = async event => {
    event.preventDefault();
    setStatus(Status.LOADING);

    const promises = [];

    for (const file of fileList) {
      promises.push(readFile(file));
    }

    try {
      const data = await Promise.all(promises);

      const emailAddresses = data
        .map(fileData => parseFileData(fileData.data))
        .flat()
        .filter(Boolean);

      const response = await sendEmailAddresses(emailAddresses);

      if (!response.ok && response.error) {
        setError(response);
        setStatus(Status.ERROR);
      } else {
        formRef.current.reset();
        setFileList([]);
        setError(null);
        setStatus(Status.SUCCESS);
      }
    } catch (error) {
      setError(error);
      setStatus(Status.ERROR);
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <FileSelector fileTypes='.txt' onChange={setFileList} />
        <FileList files={fileList} />
        <button disabled={!fileList?.length}>Send emails</button>
      </form>
      {status === Status.ERROR && <CustomError error={error} />}
      {status === Status.SUCCESS && <p>Emails sent successfully!</p>}
    </div>
  );
}

export default App;
