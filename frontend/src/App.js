import React from 'react';
import CustomError from './components/CustomError';
import FileList from './components/FileList';
import FileSelector from './components/FileSelector';
import { sendEmailAddresses } from './services/email-sender';
import { parseFileData, readFile } from './services/file-reader';
import { Status, useAsync } from './utils/useAsync';

import styles from './App.module.css';
import Spinner from './components/Spinner';

async function parseFilesAndSendEmails(files, onSuccess) {
  const promises = [];
  for (const file of files) {
    promises.push(readFile(file));
  }

  const data = await Promise.all(promises);

  const emailAddresses = data
    .map(fileData => parseFileData(fileData.data))
    .flat()
    .filter(Boolean);

  const response = await sendEmailAddresses(emailAddresses);

  if (!response.ok && response.error) {
    return Promise.reject(response);
  } else {
    onSuccess();
  }
}

function App() {
  const [fileList, setFileList] = React.useState([]);
  const formRef = React.useRef(null);

  const { status, error, run, reset } = useAsync();

  const resetForm = () => formRef.current.reset();
  const handleFormSubmit = async event => {
    event.preventDefault();

    run(parseFilesAndSendEmails(fileList, resetForm));
  };

  const handleFilesChange = fileList => {
    reset();
    setFileList(fileList);
  };

  return (
    <div>
      <form className={styles.form} ref={formRef} onSubmit={handleFormSubmit}>
        <FileSelector fileTypes='.txt' onChange={handleFilesChange} />
        <FileList files={fileList} />
        <button
          className={styles.form__submit}
          disabled={!fileList?.length || status === Status.LOADING}
        >
          Send emails
        </button>
      </form>
      {status === Status.LOADING && <Spinner />}
      {status === Status.ERROR && <CustomError error={error} />}
      {status === Status.SUCCESS && <p>Emails sent successfully!</p>}
    </div>
  );
}

export default App;
