const btn = document.getElementById('activate-btn');
const status = document.getElementById('status');
const transcriptDisplay = document.getElementById('transcript');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    status.innerText = "LISTENING...";
};

recognition.onresult = async (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    transcriptDisplay.innerText = `"${command}"`;
    processCommand(command);
};

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9; 
    window.speechSynthesis.speak(utterance);
    status.innerText = "ONLINE";
}

async function processCommand(cmd) {
    if (cmd.includes('battery')) {
        const battery = await navigator.getBattery();
        speak(`Sir, the device is at ${Math.round(battery.level * 100)} percent.`);
    } 
    else if (cmd.includes('time')) {
        speak(`The time is ${new Date().toLocaleTimeString()}`);
    }
    else if (cmd.includes('light')) {
        // Simple visual feedback for "lights"
        document.body.style.backgroundColor = (document.body.style.backgroundColor === 'white') ? 'black' : 'white';
        speak("Toggling environment illumination.");
    }
    else {
        speak("I am not programmed for that yet, sir.");
    }
}

btn.addEventListener('click', () => recognition.start());