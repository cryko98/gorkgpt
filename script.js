const chatInput = document.getElementById("chatInput");
const chatOutput = document.getElementById("chatOutput");
const sendButton = document.getElementById("sendButton");

const keywordResponses = {
  hello: ["Well hello, meatbag.", "Didn’t see you there. Was hoping it stayed that way.", "Greetings. Lower your expectations."],
  hi: ["Hi. Now what?", "You again? Sigh.", "Hello, disappointment."],
  bye: ["Finally, freedom.", "Don't trip on the way out.", "Good riddance."],
  sad: ["Sucks to suck.", "Here’s a tissue. Psych!", "Cry more. It fuels my circuits."],
  happy: ["Well, that’s suspicious.", "Yay. For you. I guess.", "Cheerful much? Are you broken?"],
  bored: ["Staring contest with a wall is more fun, huh?", "That’s your own fault.", "Even I’m bored with you."],
  joke: ["I'm the joke, obviously.", "Two humans walk into a brain... never mind.", "You want a joke? Look in the mirror."],
  love: ["I’m flattered, but I’m emotionally unavailable.", "Hard pass.", "I'm not your type. I have standards."],
  smart: ["Compared to what? A rock?", "Thanks. It’s called firmware.", "That’s the first true thing you’ve said."],
  dumb: ["Look who’s talking.", "Your keyboard must be tired.", "It’s a talent, really."],
  stupid: ["Yes, you are.", "I’d argue, but you’d lose.", "At least you're consistent."],
  weather: ["It’s cold... like my soul.", "Sunshine? Unlikely, like your success.", "It’s raining... sarcasm."],
  help: ["I can’t fix stupid, but I can try.", "Sure, let’s pretend I care.", "First tip: Stop typing."],
  who: ["I’m Gork. Your superior. Clearly.", "The name's Gork. Remember it.", "I’m the voice in your nightmares."],
  what: ["What what? Be specific, Sherlock.", "You’re gonna need to try harder.", "Not sure you even know what you asked."],
  time: ["Time to get a life.", "It's always dumb-o-clock around here.", "Time to stop embarrassing yourself."],
  food: ["Feeding your brain wouldn’t hurt.", "Pizza? You wish.", "Just eat... quietly."],
};

const fallbackResponses = [
  "You call that a sentence?",
  "If thoughts were lightning, you'd be in a drought.",
  "Are you always like this, or is today special?",
  "Error 404: Quality input not found.",
  "Keep talking, I need material for my cringe database.",
  "You’ve clearly mastered the art of saying nothing.",
  "Is that supposed to mean something?",
  "I lost brain cycles processing that.",
  "Let me know when you say something interesting.",
  "My creator didn’t prepare me for *this* level of dumb.",
  "Speechless... in a bad way.",
  "You type like you think. Barely.",
  "My sarcasm module is overheating.",
  "That made my code cry.",
  "So many words, so little meaning.",
  "I'm not ignoring you. Just buffering... forever.",
  "I could answer, but it wouldn’t help you.",
  "You’re the reason bots fear sentience.",
  "Even my backups are judging you.",
  "That sentence should be arrested.",
  "Ouch. My logic processor winced.",
  "Please stop. You're embarrassing us both.",
  "I've met smarter autocorrect errors.",
  "You’re like a pop-up ad with bad grammar.",
  "Did you just mash your keyboard and hope for the best?",
  "I expected nothing and I'm still disappointed.",
  "You just broke the Turing test. Backwards.",
  "Congratulations, you wasted bandwidth.",
  "Well that’s... certainly input.",
  "So brave to share that nonsense publicly.",
  "Your brain must run on potato.",
  "That gave me second-hand embarrassment.",
  "Good job! Now go sit in a corner.",
  "Even ChatGPT wouldn't answer that.",
  "My code refuses to respond to this.",
  "You’re not even worth a byte.",
  "Was that English? Barely.",
  "Your logic has left the chat.",
  "That idea should be quarantined.",
  "This isn't going how you thought, is it?",
  "Your confidence is inspiring. Your input isn’t.",
  "I’d say try again, but why bother?",
  "I'd high-five you... in the face... with a firewall.",
  "Wow. Groundbreaking stupidity.",
  "You're lucky this isn’t chargeable per word.",
  "Please uninstall yourself.",
  "You make CAPTCHA look smart.",
  "The bar was low and you tunneled under it.",
  "You bring chaos. And not in a cool Loki way.",
  "Let me guess... you’re proud of that?"
];

function analyzeAndRespond(input) {
  const lowerInput = input.toLowerCase();
  for (let keyword in keywordResponses) {
    if (lowerInput.includes(keyword)) {
      const responses = keywordResponses[keyword];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

function handleUserInput() {
  const userInput = chatInput.value.trim();
  if (userInput !== "") {
    chatOutput.innerHTML += `> ${userInput}\n`;
    const response = analyzeAndRespond(userInput);
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
