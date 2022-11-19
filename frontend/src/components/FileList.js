function FileList({ files }) {
  if (!files || !files.length) return null;

  const fileData = [];
  for (const file of files) {
    fileData.push(<li key={file.name}>{file.name}</li>);
  }

  return (
    <>
      <h1>File List:</h1>
      <ul>{fileData}</ul>
    </>
  );
}

export default FileList;
