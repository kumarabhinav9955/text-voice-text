let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voiceSelect.innerHTML = ''; 
    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });
    const savedVoiceIndex = localStorage.getItem('selectedVoiceIndex');
    if (savedVoiceIndex !== null) {
        voiceSelect.value = savedVoiceIndex;
        speech.voice = voices[savedVoiceIndex];
    }
};

voiceSelect.addEventListener("change", () => {
    const selectedVoiceIndex = voiceSelect.value;
    speech.voice = voices[selectedVoiceIndex];
    localStorage.setItem('selectedVoiceIndex', selectedVoiceIndex);

});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);


});

const startButton = document.getElementById('startButton');
const textarea = document.querySelector("textarea"); 

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US' ;

recognition.onstart = () => {
    startButton.textContent = 'Listening.....';
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textarea.value = transcript; 
};

recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
};

startButton.addEventListener('click', () => {
    recognition.start();
});
