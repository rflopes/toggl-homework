import React from 'react';

function FileSelector({ onChange, fileTypes }) {
  return (
    <input
      type='file'
      id='file-selector'
      accept={fileTypes}
      multiple
      onChange={event => onChange(event.target.files)}
    />
  );
}

export default FileSelector;
