const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const imageBtn = document.getElementById('imageBtn');
const imageInput = document.getElementById('imageInput');
const emojiBtn = document.getElementById('emojiBtn');
const gifBtn = document.getElementById('gifBtn');
const emojiPicker = document.getElementById('emojiPicker');
const emojiGrid = document.getElementById('emojiGrid');

// Populate emoji grid
const emojis = ['😀', '😂', '🤣', '😊', '😍', '🥰', '😎', '🤔', '🙄', '😏', '😒', '😭', '😡', '🤯', '🥳', '🤪', '👍', '👎', '👏', '🙌', '🤝', '💪', '🙏', '❤️', '💔', '🔥', '⭐', '✨', '💯', '🎉', '🎊', '🚀'];
emojis.forEach(emoji => {
  const span = document.createElement('span');
  span.textContent = emoji;
  span.style.cursor = 'pointer';
  emojiGrid.appendChild(span);
});

let isRecording = false;
let recognition = null;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    voiceBtn.classList.remove('active');
    isRecording = false;
  };
  
  recognition.onerror = () => {
    voiceBtn.classList.remove('active');
    isRecording = false;
  };
}

// Auto-resize textarea
messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = messageInput.scrollHeight + 'px';
});

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Voice input
voiceBtn.addEventListener('click', () => {
  if (!recognition) {
    alert('Speech recognition not supported in your browser');
    return;
  }
  
  if (isRecording) {
    recognition.stop();
    voiceBtn.classList.remove('active');
    isRecording = false;
  } else {
    recognition.start();
    voiceBtn.classList.add('active');
    isRecording = true;
  }
});

// Image upload
imageBtn.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    sendMessage('image');
  }
});

// Emoji picker
emojiBtn.addEventListener('click', () => {
  emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

emojiPicker.addEventListener('click', async (e) => {
  if (e.target.tagName === 'SPAN' && e.target.textContent.trim()) {
    const emoji = e.target.textContent.trim();
    emojiPicker.style.display = 'none';
    
    // Add emoji to chat
    addMessage(emoji, 'user');
    
    // Send to AI
    const tempMsg = messageInput.value;
    messageInput.value = emoji;
    await sendMessage('emoji');
    messageInput.value = tempMsg;
  }
});

// GIF button - search and send GIF
gifBtn.addEventListener('click', async () => {
  const query = prompt('What GIF do you want? (e.g., "happy", "confused", "dancing")');
  if (!query) return;
  
  try {
    // Using Tenor API
    const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&limit=1`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const gifUrl = data.results[0].media_formats.gif.url;
      addMessage(`<img src="${gifUrl}" alt="${query} GIF" style="max-width: 300px;">`, 'user');
      
      // Send GIF context to AI
      const tempMsg = messageInput.value;
      messageInput.value = `[User sent a ${query} GIF]`;
      await sendMessage('gif');
      messageInput.value = tempMsg;
    } else {
      alert('No GIF found. Try another search term!');
    }
  } catch (error) {
    console.error('GIF error:', error);
    alert('Failed to load GIF. Try again!');
  }
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
  if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
    emojiPicker.style.display = 'none';
  }
});

async function sendMessage(type = 'text') {
  const message = messageInput.value.trim();
  const imageFile = imageInput.files[0];
  
  if (!message && !imageFile) return;
  
  // Add user message (skip if emoji or gif, already added)
  if (message && type !== 'emoji' && type !== 'gif') {
    addMessage(message, 'user');
  }
  
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      addMessage(`<img src="${e.target.result}" alt="Uploaded image">`, 'user');
    };
    reader.readAsDataURL(imageFile);
  }
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  imageInput.value = '';
  
  // Show typing indicator
  const typingId = addTypingIndicator();
  
  // Disable send button
  sendBtn.disabled = true;
  
  try {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('type', type);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    // Remove typing indicator
    removeTypingIndicator(typingId);
    
    // Add bot response with speaker button
    addMessage(data.reply, 'bot', true);
    
  } catch (error) {
    removeTypingIndicator(typingId);
    addMessage('Oops, something went wrong. How embarrassing. 😅', 'bot');
  }
  
  sendBtn.disabled = false;
  messageInput.focus();
}

function addMessage(content, sender, withSpeaker = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `<p>${content}</p>`;
  
  if (withSpeaker) {
    const speakerBtn = document.createElement('button');
    speakerBtn.className = 'speaker-btn';
    speakerBtn.innerHTML = '🔊';
    speakerBtn.title = 'Read aloud (click again to stop)';
    speakerBtn.onclick = () => speakText(content, speakerBtn);
    contentDiv.appendChild(speakerBtn);
  }
  
  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addTypingIndicator() {
  const id = 'typing-' + Date.now();
  const messageDiv = document.createElement('div');
  messageDiv.id = id;
  messageDiv.className = 'message bot-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

// Voice settings
let selectedVoice = null;
let voiceRate = 1.25; // Faster, more energetic
let voicePitch = 1.3; // Higher pitch for sass and energy
let currentUtterance = null;

// Load voices
function loadVoices() {
  return speechSynthesis.getVoices();
}

// Load voices on page load and when they change
speechSynthesis.onvoiceschanged = () => {
  const voices = loadVoices();
  if (voices.length > 0 && !selectedVoice) {
    // Try to find a fun/quirky voice
    selectedVoice = voices.find(voice => 
      voice.name.includes('Zira') || 
      voice.name.includes('Female') ||
      voice.name.includes('Google UK English Female') ||
      voice.name.includes('Samantha')
    ) || voices[0];
    console.log('Selected voice:', selectedVoice?.name);
  }
};

// Initial load
setTimeout(() => {
  const voices = loadVoices();
  if (voices.length > 0 && !selectedVoice) {
    selectedVoice = voices.find(voice => 
      voice.name.includes('Zira') || 
      voice.name.includes('Female') ||
      voice.name.includes('Google UK English Female') ||
      voice.name.includes('Samantha')
    ) || voices[0];
    console.log('Selected voice:', selectedVoice?.name);
  }
}, 100);

let currentAudio = null;

async function speakText(text, button) {
  try {
    // If already speaking, stop it
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
      button.classList.remove('playing');
      button.disabled = false;
      button.innerHTML = '🔊';
      return;
    }
    
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      button.classList.remove('playing');
      button.disabled = false;
      button.innerHTML = '🔊';
      return;
    }
    
    button.classList.add('playing');
    button.innerHTML = '⏹️'; // Stop icon
    
    // Try to use server TTS first (ElevenLabs)
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.replace(/<[^>]*>/g, '') })
      });
      
      console.log('TTS response status:', response.status);
      console.log('TTS response type:', response.headers.get('content-type'));
      
      // Check if response is JSON (fallback signal)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        console.log('TTS JSON response:', json);
        throw new Error('Use browser TTS');
      }
      
      // Use ElevenLabs audio
      const data = await response.blob();
      console.log('Audio blob size:', data.size);
      
      if (data.size === 0) {
        throw new Error('Empty audio response');
      }
      
      const audioUrl = URL.createObjectURL(data);
      currentAudio = new Audio(audioUrl);
      
      currentAudio.onended = () => {
        button.classList.remove('playing');
        button.disabled = false;
        button.innerHTML = '🔊';
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
      };
      
      currentAudio.onerror = (e) => {
        console.error('Audio playback error:', e);
        button.classList.remove('playing');
        button.disabled = false;
        button.innerHTML = '🔊';
        currentAudio = null;
        throw new Error('Audio playback failed');
      };
      
      console.log('Playing audio...');
      await currentAudio.play();
      return;
    } catch (apiError) {
      // Fallback to browser TTS
      console.log('Using browser TTS fallback:', apiError.message);
    }
    
    // Use browser's built-in speech synthesis
    // Remove HTML tags and emojis
    let cleanText = text.replace(/<[^>]*>/g, ''); // Remove HTML
    cleanText = cleanText.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Emoticons
    cleanText = cleanText.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // Misc Symbols
    cleanText = cleanText.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // Transport
    cleanText = cleanText.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, ''); // Flags
    cleanText = cleanText.replace(/[\u{2600}-\u{26FF}]/gu, ''); // Misc symbols
    cleanText = cleanText.replace(/[\u{2700}-\u{27BF}]/gu, ''); // Dingbats
    cleanText = cleanText.replace(/[\u{FE00}-\u{FE0F}]/gu, ''); // Variation Selectors
    cleanText = cleanText.replace(/[\u{1F900}-\u{1F9FF}]/gu, ''); // Supplemental Symbols
    cleanText = cleanText.replace(/[\u{1FA00}-\u{1FA6F}]/gu, ''); // Chess Symbols
    cleanText = cleanText.replace(/[\u{1FA70}-\u{1FAFF}]/gu, ''); // Symbols and Pictographs Extended-A
    
    // Make it more conversational - add pauses for natural speech
    cleanText = cleanText.replace(/\.\.\./g, '... '); // Pause for ellipsis
    cleanText = cleanText.replace(/([.!?])\s+/g, '$1  '); // Longer pause after sentences
    cleanText = cleanText.replace(/,\s+/g, ', '); // Short pause for commas
    cleanText = cleanText.replace(/:\s+/g, ':  '); // Pause after colons
    cleanText = cleanText.replace(/💭\s*My Opinion:/gi, '. And here is my opinion: '); // Make section natural
    cleanText = cleanText.trim();
    
    if (!cleanText) {
      button.classList.remove('playing');
      button.innerHTML = '🔊';
      return; // Nothing to read
    }
    
    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    currentUtterance.rate = voiceRate; // Energetic speed
    currentUtterance.pitch = voicePitch; // Sassy, energetic pitch
    currentUtterance.volume = 1.0; // Full volume
    
    // Add emphasis variation for more energy
    currentUtterance.addEventListener('boundary', (event) => {
      // Randomly vary pitch slightly for more dynamic speech
      if (Math.random() > 0.7) {
        currentUtterance.pitch = voicePitch + (Math.random() * 0.2 - 0.1);
      }
    });
    
    // Make sure we have voices loaded
    const voices = loadVoices();
    if (selectedVoice) {
      currentUtterance.voice = selectedVoice;
    } else if (voices.length > 0) {
      selectedVoice = voices.find(voice => 
        voice.name.includes('Zira') || 
        voice.name.includes('Female')
      ) || voices[0];
      currentUtterance.voice = selectedVoice;
    }
    
    currentUtterance.onend = () => {
      button.classList.remove('playing');
      button.disabled = false;
      button.innerHTML = '🔊';
    };
    
    currentUtterance.onerror = () => {
      button.classList.remove('playing');
      button.disabled = false;
      button.innerHTML = '🔊';
    };
    
    speechSynthesis.speak(currentUtterance);
  } catch (error) {
    console.error('TTS error:', error);
    button.classList.remove('playing');
    button.disabled = false;
    button.innerHTML = '🔊';
  }
}

// Voice settings button
function showVoiceSettings() {
  const voices = loadVoices();
  
  if (voices.length === 0) {
    alert('No voices available yet. Try again in a moment.');
    return;
  }
  
  const voiceList = voices.map((v, i) => `${i}: ${v.name} (${v.lang})`).join('\n');
  
  const choice = prompt(`Current voice: ${selectedVoice?.name || 'Default'}\nRate: ${voiceRate}x | Pitch: ${voicePitch}\n\nAvailable voices:\n${voiceList}\n\nEnter voice number to change:`);
  
  if (choice !== null && choice !== '') {
    const index = parseInt(choice);
    if (index >= 0 && index < voices.length) {
      selectedVoice = voices[index];
      console.log('Voice changed to:', selectedVoice.name);
      alert(`Voice changed to: ${selectedVoice.name}\n\nClick a speaker button to test it!`);
    } else {
      alert('Invalid voice number!');
    }
  }
}
