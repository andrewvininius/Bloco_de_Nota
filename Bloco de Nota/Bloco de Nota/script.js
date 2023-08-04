const btnNew = document.getElementById('btnNew');
const btnOpen = document.getElementById('btnOpen');
const btnSave = document.getElementById('btnSave');
const editor = document.getElementById('editor');

let currentFile = null;

btnNew.addEventListener('click', () => {
  editor.value = '';
  currentFile = null;
});

btnOpen.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.txt';

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      editor.value = reader.result;
      currentFile = file.name;
    };

    reader.readAsText(file);
  });

  fileInput.click();
});

btnSave.addEventListener('click', () => {
  if (currentFile) {
    downloadFile(currentFile, editor.value);
  } else {
    const fileName = prompt('Digite o nome do arquivo:');
    if (fileName) {
      downloadFile(fileName, editor.value);
      currentFile = fileName;
    }
  }
});

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
