document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  const outputDiv = document.getElementById('output');
  const voiceSelect = document.getElementById('voice-select');
  const textToConvert = document.getElementById('text-to-convert');

  // Populate voice options
  function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name;
      voiceSelect.appendChild(option);
    });
  }

  if ('speechSynthesis' in window) {
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  }

  convertBtn.addEventListener('click', () => {
    const text = textToConvert.value;

    if (text) {
      const speech = new SpeechSynthesisUtterance(text);
      const selectedVoice = voiceSelect.value;
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === selectedVoice);
      speech.voice = voice;
      speechSynthesis.speak(speech);
      outputDiv.textContent = 'Speaking...';
    } else {
      outputDiv.textContent = 'Please enter some text.';
    }
  });
});