function FileList({ files, filesContent }) {
  if (!files || !files.length) return null;

  const fileData = [];
  for (const file of files) {
    fileData.push(
      <li key={file.name}>
        {file.name} ({filesContent[fileData.length].length} email addresses)
      </li>,
    );
  }

  return (
    <div>
      <h3>File List:</h3>
      <ul>{fileData}</ul>
    </div>
  );
}

export default FileList;
