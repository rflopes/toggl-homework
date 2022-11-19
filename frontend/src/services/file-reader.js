export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      resolve({ file, data: event.target.result });
    });

    reader.addEventListener('error', reject);

    reader.readAsText(file);
  });
}
