function FileList({ files }) {
  if (!files || !files.length) return null;

  const fileData = [];
  for (const file of files) {
    fileData.push(<li key={file.name}>{file.name}</li>);
  }

  return (
    <div>
      <h3>File List:</h3>
      <ul>{fileData}</ul>
    </div>
  );
}

export default FileList;
