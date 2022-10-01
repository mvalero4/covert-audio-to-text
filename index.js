const start = document.getElementById('start');
const stop = document.getElementById('stop');
const play = document.getElementById('play');
const deleteButton = document.getElementById('delete');
const text = document.getElementById('text');

const radioButton = document.querySelectorAll("input[name='radio-button']");

const pdf = document.getElementById('pdf');
const docx = document.getElementById('docx');
const txt = document.getElementById('txt');
const js = document.getElementById('js');
const css = document.getElementById('css');
const html = document.getElementById('html');

let recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    text.value += frase;
    console.log(results);
}

recognition.onend = (event) => {
    console.log('Stop recording');
}

recognition.onerror = (event) => {
    console.log(event.error);
}

start.addEventListener('click', () => {
    recognition.start();
});

stop.addEventListener('click', () => {
    recognition.stop();
});

play.addEventListener('click', () => {
    readText(text.value);
});

deleteButton.addEventListener('click', () => {
    text.value = "";
    filename.value = "";
})

function readText (text) {
    const speech = new SpeechSynthesisUtterance();
    const languages = document.getElementById('languages');

    if (languages.value === 'english') {
        recognition.lang = 'en-US';
        speech.lang = 'en-US';
    } else if (languages.value === 'spanish') {
        recognition.lang = 'es-ES';
        speech.lang = 'es-ES';
    } else if (languages.value === 'italian') {
        recognition.lang = 'it-IT';
        speech.lang = 'it-IT';
    } else if (languages.value === 'italian') {
        recognition.lang = 'fr-FR';
        speech.lang = 'fr-FR';
    } else if (languages.value === 'german') {
        recognition.lang = 'de-DE';
        speech.lang = 'de-DE';
    }

    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
};

function downloadFile (filename, content){
    const element = document.createElement('a');
    const blob = new Blob([content], {
        type: 'plain/text',
    });

    const fileUrl = URL.createObjectURL(blob);

    element.setAttribute('href', fileUrl);
    element.setAttribute('download', filename);

    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
};

window.onload = () => {
    document.getElementById('download').addEventListener('click', e => {
        let filename = document.getElementById('filename').value;

        if (pdf.checked === true) {
            filename = `${filename}.pdf`;
        } else if (docx.checked === true) {
            filename = `${filename}.docx`;
        } else if (txt.checked === true) {
            filename = `${filename}.txt`;
        } else if (js.checked === true) {
            filename = `${filename}.js`;
        } else if (css.checked === true) {
            filename = `${filename}.css`;
        } else if (html.checked === true) {
            filename = `${filename}.html`;
        }

        const content = document.getElementById('text').value;

        if (filename && content) {
            downloadFile(filename, content);
        }
    });
}