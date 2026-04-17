const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

function startListening() {
  const btn = document.getElementById("mic-btn");
  btn.classList.add("listening");
  btn.textContent = "🔴 Listening...";
  document.getElementById("status").textContent = "Speak now!";
  recognition.start();
}

recognition.onresult = function(event) {
  const userSpeech = event.results[0][0].transcript;
  document.getElementById("user-text").textContent = userSpeech;
  document.getElementById("status").textContent = "Thinking...";
  askAI(userSpeech);
};

recognition.onerror = function(event) {
  document.getElementById("status").textContent = "Mic error: " + event.error;
  resetButton();
};

// ============================================================
//  ADD YOUR OWN QUESTIONS AND ANSWERS BELOW
//  Just copy any block and change the keyword + reply text
// ============================================================

function askAI(userMessage) {
  const msg = userMessage.toLowerCase();
  let reply = "";

  // ── GREETINGS ──────────────────────────────────────────────
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    reply = "Hello! I am your AI voice assistant. How can I help you?";

  } else if (msg.includes("how are you")) {
    reply = "I am doing great, thank you! How about you?";

  } else if (msg.includes("good morning")) {
    reply = "Good morning! Hope you have a wonderful day ahead!";

  } else if (msg.includes("good night")) {
    reply = "Good night! Sleep well and take care!";

  // ── ABOUT YOU (personalise this section!) ──────────────────
  } else if (msg.includes("What is your name") || msg.includes("who are you")) {
    reply = "I am Jarvis, your personal AI assistant built by a smart student!";
    // ↑ Change "Jarvis" to whatever name you want!

  } else if (msg.includes("who made you") || msg.includes("who created you")) {
    reply = "I was created by a first year student as a college project!";
    // ↑ Put YOUR name here!

  } else if (msg.includes("how old are you")) {
    reply = "I was just born! I am a brand new AI assistant.";

  // ── DATE AND TIME ──────────────────────────────────────────
  } else if (msg.includes("time")) {
    reply = "The current time is " + new Date().toLocaleTimeString();

  } else if (msg.includes("date") || msg.includes("today")) {
    reply = new Date().toDateString() + " is today's date.";

  } else if (msg.includes("Tell me days in a week")) {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    reply = "Today is " + days[new Date().getDay()];

  } else if (msg.includes("year")) {
    reply = "The current year is " + new Date().getFullYear();

  // ── MATH ───────────────────────────────────────────────────
  } else if (msg.includes("2 + 2") || msg.includes("two plus two")) {
    reply = "2 plus 2 is 4!";

  } else if (msg.includes("10 + 5") || msg.includes("ten plus five")) {
    reply = "10 plus 5 is 15!";

  // ── JOKES ──────────────────────────────────────────────────
  } else if (msg.includes("joke")) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "Why did the computer go to the doctor? Because it had a virus!",
      "What do you call a computer that sings? A Dell!"
    ];
    // Pick a random joke each time
    reply = jokes[Math.floor(Math.random() * jokes.length)];

  // ── GENERAL KNOWLEDGE ─────────────────────────────────────
  } else if (msg.includes("capital of india")) {
    reply = "The capital of India is New Delhi.";

  } else if (msg.includes("capital of france")) {
    reply = "The capital of France is Paris.";

  } else if (msg.includes("largest country")) {
    reply = "Russia is the largest country in the world by area.";

  } else if (msg.includes("fastest animal")) {
    reply = "The cheetah is the fastest land animal, reaching up to 120 km per hour!";

  } else if (msg.includes(" Total number of planets in our solar system")) {
    reply = "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.";

  } else if (msg.includes("sun")) {
    reply = "The Sun is a star at the center of our solar system. It is about 150 million kilometers from Earth.";

  // ── TECH QUESTIONS ─────────────────────────────────────────
  } else if (msg.includes("what is ai") || msg.includes("what is artificial intelligence")) {
    reply = "AI stands for Artificial Intelligence. It means making computers think and learn like humans.";

  } else if (msg.includes("what is python")) {
    reply = "Python is a popular programming language. It is easy to learn and used for AI, websites, and data science.";

  } else if (msg.includes("what is javascript")) {
    reply = "JavaScript is a programming language used to make websites interactive. You are using it right now!";

  // ── FUN STUFF ──────────────────────────────────────────────
  } else if (msg.includes("can you sing") || msg.includes("song")) {
    reply = "La la la! I am not a great singer, but I am an amazing talker!";

  } else if (msg.includes("favorite color") || msg.includes("favourite color")) {
    reply = "My favourite color is electric blue, just like a computer screen!";

  } else if (msg.includes("are you real")) {
    reply = "I am a software program, not a human. But I feel very real to you, right?";

  } else if (msg.includes("i love you")) {
    reply = "That is very sweet! I care about you too. Now, how can I help you today?";

  // ── GOODBYE ────────────────────────────────────────────────
  } else if (msg.includes("thank you")) {
    reply = "You are most welcome! Always happy to help.";

  } else if (msg.includes("bye") || msg.includes("goodbye")) {
    reply = "Goodbye! Have a great day. Come back anytime!";

  // ── DEFAULT (when nothing matches) ─────────────────────────
  } else {
    reply = "I heard you say: " + userMessage + ". I do not have an answer for that yet. Ask me something else!";
  }

  // Show and speak the reply
  document.getElementById("ai-text").textContent = reply;
  document.getElementById("status").textContent = "Speaking...";
  speakText(reply);
}

function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1.0;
  speech.pitch = 1.0;
  speech.onend = function() {
    document.getElementById("status").textContent = "Done! Press button to ask again.";
    resetButton();
  };
  window.speechSynthesis.speak(speech);
}

function resetButton() {
  const btn = document.getElementById("mic-btn");
  btn.classList.remove("listening");
  btn.textContent = "🎤 Hold to Speak";
}