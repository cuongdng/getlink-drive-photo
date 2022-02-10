const input = document.getElementById('input');
const output = document.getElementById('output');

const preview = document.querySelector('.preview');

const getBtn = document.getElementById('getBtn');
const copyBtn = document.getElementById('copyBtn');
const copiedText = document.getElementById('copied');
const loading = document.querySelector('.preview span');

input.value = '';
output.value = '';
let inputLink = '';
const rootLink = 'https://drive.google.com/uc?export=view&id=';
const rootDownloadLink = 'https://drive.google.com/uc?export=download&id=';

getBtn.addEventListener('click', (e) => {
    copiedText.style.display = 'none';
    preview.innerHTML = `
        <button class="btn" id="download-btn">Download</button>
    `;
    if (input.value) {
        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.disabled = true;
        const loadingText = document.createElement('span');
        loadingText.innerText = 'Loading image...';
        preview.appendChild(loadingText);
        inputLink = input.value;
        output.value = rootLink + getId(inputLink);
        const imgPreview = document.createElement('img');
        imgPreview.src = output.value;
        preview.appendChild(imgPreview);
        preview.querySelector('img').addEventListener('load', () => {
            preview.querySelector('img').previousElementSibling.remove();
            downloadBtn.disabled = false;
        });
        downloadBtn.addEventListener('click', function () {
            downloadLink(rootDownloadLink + getId(inputLink));
        });
    }
});

copyBtn.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    copiedText.style.display = 'block';
});

function getId(link) {
    return link.split('/')[5];
}

function downloadLink(url) {
    var tmpElement = document.createElement('a');
    tmpElement.setAttribute('href', url);
    tmpElement.setAttribute('download', url);
    tmpElement.click();
    tmpElement.remove();
}
