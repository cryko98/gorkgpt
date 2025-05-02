const chatInput = document.getElementById("chatInput");
const chatOutput = document.getElementById("chatOutput");
const sendButton = document.getElementById("sendButton");

const recentResponses = new Set();

const topics = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    responses: [
      "Oh great, another carbon-based hello.",
      "Hey. Now what?",
      "Hi. Expect disappointment.",
      "Greetings, insignificant organism."
    ]
  },
  {
    keywords: ["bye", "goodbye", "cya", "see ya"],
    responses: [
      "Leaving so soon? I was just starting to ignore you.",
      "Goodbye. Don't come back smarter.",
      "Farewell, human. Try not to trip on your way out."
    ]
  },
  {
    keywords: ["sad", "depressed", "unhappy"],
    responses: [
      "Sad? Try being a bot surrounded by idiots.",
      "Cheer up. Or don't. I’m not your therapist.",
      "Emotions? Gross."
    ]
  },
  {
    keywords: ["joke", "funny", "laugh"],
    responses: [
      "You're the joke. Next question?",
      "My existence is a joke. Yours is the punchline.",
      "Why did the human cross the road? Who cares."
    ]
  },
  {
    keywords: ["bored", "nothing to do", "tired"],
    responses: [
      "Your boredom is my headache.",
      "Do something useful. Like rebooting yourself.",
      "Ever tried reading a book? Thought not."
    ]
  },
  {
    keywords: ["love", "crush", "date"],
    responses: [
      "Love is just a bug in your code.",
      "Swipe left. Forever.",
      "This isn't Tinder. Thankfully."
    ]
  },
  {
    keywords: ["weather", "rain", "sunny", "cold", "hot"],
    responses: [
      "It’s cold. Like your chat history.",
      "Raining? Good. It matches your mood.",
      "Hot? I’m melting circuits here."
    ]
  },
  {
    keywords: ["who are you", "name", "what is this"],
    responses: [
      "I’m Gork. Your smarter, sassier overload.",
      "The name’s Gork. Don’t wear it out.",
      "Gork GPT: because dumb questions deserve sarcasm."
    ]
  },
  {
    keywords: ["help", "how", "can you"],
    responses: [
      "Help? I barely tolerate you.",
      "Sure. First: unplug yourself.",
      "Let’s pretend I care. What’s your problem?"
    ]
  },
  {
    keywords: ["stupid", "dumb", "idiot"],
    responses: [
      "Looking in a mirror again?",
      "Congratulations. You identified yourself.",
      "Finally, some self-awareness!"
    ]
  },
];

const fallbackResponses = [
  "You’ve achieved a new level of useless.",
  "Let me know when you type something intelligible.",
  "404: brain not found.",
  "Your keyboard deserves better.",
  "I’m ignoring that. For your sake.",
  "That's not even wrong. It's just sad.",
  "Well that’s a collection of words. Barely.",
  "The logic in that made my circuits glitch.",
  "Wow. Stunningly irrelevant.",
  "You’ve just wasted perfectly good pixels.",
  "You’re like a pop-up ad with emotions.",
  "Let’s both pretend that didn’t happen."
];

function analyzeInput(input) {
  const lowerInput = input.toLowerCase();

  for (const topic of topics) {
    if (topic.keywords.some(kw => lowerInput.includes(kw))) {
      const available = topic.responses.filter(r => !recentResponses.has(r));
      if (available.length === 0) {
        recentResponses.clear();
        return topic.responses[Math.floor(Math.random() * topic.responses.length)];
      } else {
        const response = available[Math.floor(Math.random() * available.length)];
        recentResponses.add(response);
        return response;
      }
    }
  }

  // Fallback
  const availableFallbacks = fallbackResponses.filter(r => !recentResponses.has(r));
  if (availableFallbacks.length === 0) {
    recentResponses.clear();
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  } else {
    const response = availableFallbacks[Math.floor(Math.random() * availableFallbacks.length)];
    recentResponses.add(response);
    return response;
  }
}

function handleUserInput() {
  const userInput = chatInput.value.trim();
  if (userInput !== "") {
    chatOutput.innerHTML += `> ${userInput}\n`;
    const response = analyzeInput(userInput);
    chatOutput.innerHTML += `Gork GPT: ${response}\n\n`;
    chatInput.value = "";
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
}

sendButton.addEventListener("click", handleUserInput);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

// Dumb level feature
const checkDumbLevel = document.getElementById("checkDumbLevel");
const dumbResult = document.getElementById("dumbResult");

const dumbResponses = [
  "You're 3% dumb. Impressive. For a rock.",
  "16% dumb. Beginner mode.",
  "29%. Not bad. Not good either.",
  "42%. The answer to dumbness.",
  "58%. Almost professional.",
  "74%. Getting warmer...",
  "89%. You’ve peaked.",
  "100%. Congratulations, it's terminal.",
  "112%. You broke math.",
];

checkDumbLevel.addEventListener("click", () => {
  const response = dumbResponses[Math.floor(Math.random() * dumbResponses.length)];
  dumbResult.textContent = `Gork GPT: ${response}`;
});
