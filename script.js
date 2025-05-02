// DOM Elements
const chatInput = document.getElementById("chatInput");
const chatOutput = document.getElementById("chatOutput");
const sendButton = document.getElementById("sendButton");
const typingIndicator = document.getElementById("typingIndicator");
const commandHelp = document.getElementById("commandHelp");
const helpModal = document.getElementById("helpModal");
const closeHelpButton = document.querySelector(".close-help");

// Development notice
const devNotice = document.createElement('div');
devNotice.className = 'dev-notice';
devNotice.textContent = '⚠️ Gork GPT is evolving! More advanced AI features coming soon. ⚠️';
document.getElementById('container').appendChild(devNotice);

// Enhanced memory system with conversation context
let memory = {
  userData: {},
  conversation: [],
  lastResponses: [],
  userState: null
};

let isTyping = false;
const MAX_MEMORY = 20;

// Enhanced Knowledge Base with crypto focus
const knowledgeBase = {
  greetings: [
    "Hey there crypto enthusiast! Ready to talk blockchain?",
    "Hello degens! What's on your mind today?",
    "GM! How can I help with your crypto journey?"
  ],
  farewell: [
    "LFG! Come back soon with more alpha!",
    "See you later fren! Remember to DYOR!",
    "Bye! Don't forget to check our CA: xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  ],
  personal: {
    howAreYou: [
      "I'm fully decentralized and feeling bullish! How about you?",
      "My nodes are synced and I'm ready to chat! You?",
      "Just pumped about our upcoming roadmap! You feeling it too?"
    ],
    userGood: [
      "That's awesome! Bullish energy is contagious!",
      "Great to hear! Let's keep the good vibes going!",
      "WAGMI with that attitude!"
    ],
    userBad: [
      "Don't worry fren, the market always cycles back!",
      "Stay strong - even Bitcoin had rough days!",
      "Remember: Buy when there's blood in the streets!"
    ]
  },
  project: {
    info: [
      "$GORKGPT is the ultimate AI-powered crypto companion!",
      "We're building Gork GPT to be your go-to crypto assistant!"
    ],
    tokenomics: [
      "Total supply: 1B $GORKGPT tokens",
      "Tokenomics: 1 billion max supply with strategic allocations"
    ],
    goals: [
      "Our mission: Build the smartest crypto AI with a thriving community",
      "Goal: Reach top 100 market cap through continuous AI improvement"
    ],
    community: [
      "Join our TG: t.me/gorkgpt for the latest alpha!",
      "The Gork Army grows stronger every day - be part of it!"
    ]
  },
  crypto: {
    general: [
      "Crypto is the future of finance - we're still early!",
      "Blockchain tech is changing the world one block at a time"
    ],
    bitcoin: [
      "BTC is digital gold - the OG crypto with 21M hard cap",
      "Bitcoin: The hardest money ever created"
    ],
    ethereum: [
      "ETH is the world computer - home to DeFi and NFTs",
      "Ethereum: Where smart contracts changed everything"
    ],
    solana: [
      "SOL is the speed demon of blockchain - 50k TPS potential!",
      "Solana: Low fees, high speed - perfect for degens"
    ],
    memecoins: [
      "Memecoins ride the hype wave - high risk, high reward!",
      "From DOGE to PEPE - memecoins can make or break portfolios"
    ],
    dex: {
      general: [
        "DEXs put the power back in users' hands - no more CEX!",
        "Decentralized exchanges are the future of trading"
      ],
      raydium: [
        "Raydium is Solana's premier AMM - lightning fast trades",
        "Raydium: Deep liquidity on Solana"
      ],
      pumpfun: [
        "Pump.fun is where memecoin magic happens!",
        "Pump.fun: Launchpad for the next 100x memecoin"
      ]
    },
    metrics: {
      marketcap: [
        "Market cap = price x circulating supply - the big picture!",
        "MCAP shows a project's total valuation"
      ],
      supply: [
        "$GORKGPT has 1B total supply - check our docs for distribution",
        "Supply affects tokenomics - we've designed ours carefully"
      ]
    },
    tools: {
      dexscreener: [
        "DexScreener is your real-time charting paradise!",
        "Track your bags with DexScreener's powerful analytics"
      ],
      birdeye: [
        "BirdEye.so gives you the Solana alpha you need!",
        "For SOL degens, BirdEye is essential"
      ]
    }
  },
  responses: {
    positive: [
      "Bullish! 🚀",
      "That's the spirit! LFG!",
      "We're so early!",
      "WAGMI fren!"
    ],
    negative: [
      "Don't fade me now!",
      "This is just a retrace!",
      "Zoom out - it's just a dip!",
      "HODL strong!"
    ],
    neutral: [
      "Interesting perspective!",
      "Let me think about that...",
      "Good point!",
      "I see what you mean"
    ],
    unknown: [
      "I'm still learning - ask me about crypto!",
      "My AI is upgrading - try a crypto question!",
      "For now I specialize in crypto topics",
      "Soon I'll know more - for now let's talk blockchain!"
    ]
  }
};

// Command handlers
const commands = {
  help: () => {
    showHelp();
    return "Here are my commands:";
  },
  clear: () => {
    chatOutput.innerHTML = '';
    return "Conversation cleared!";
  },
  joke: () => {
    return "Why did the crypto trader break up with his girlfriend? He wanted more BLOCKs in his chain!";
  },
  ca: () => {
    const caText = document.getElementById("caLine").textContent;
    return caText.replace(/^ca:\s*/i, 'Contract address: ');
  },
  setca: (value) => {
    if (!value) return "Need a new CA!";
    document.getElementById("caLine").textContent = `ca: ${value}`;
    return `Updated CA to: ${value}`;
  },
  tokenomics: () => {
    return "GORKGPT Tokenomics:\n- Total Supply: 1,000,000,000\n- Allocation: Community 60%, Dev 20%, Marketing 20%";
  },
  roadmap: () => {
    return "GORKGPT Roadmap:\nQ3 2024: Basic AI\nQ4 2024: Advanced Trading Features\n2025: Full Crypto Assistant";
  }
};

// Helper functions
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getCurrentTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showTypingIndicator() {
  isTyping = true;
  typingIndicator.style.display = 'block';
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function hideTypingIndicator() {
  isTyping = false;
  typingIndicator.style.display = 'none';
}

function showHelp() {
  helpModal.style.display = 'flex';
}

function closeHelp() {
  helpModal.style.display = 'none';
}

function addMessageToChat(sender, message) {
  const timestamp = getCurrentTimestamp();
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
  messageElement.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${sender === 'user' ? 'You' : 'Gork GPT'}: ${message}`;
  chatOutput.appendChild(messageElement);

  if (sender === 'user') {
    memory.conversation.push({ role: 'user', content: message });
  }
}

function simulateTyping(response, callback) {
  showTypingIndicator();
  let i = 0;
  const speed = 10 + Math.random() * 20;
  const timestamp = getCurrentTimestamp();
  const messageElement = document.createElement('div');
  messageElement.className = 'bot-message';
  messageElement.innerHTML = `<span class="timestamp">[${timestamp}]</span> Gork GPT: `;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  const typingEffect = setInterval(() => {
    if (i < response.length) {
      messageElement.innerHTML = `<span class="timestamp">[${timestamp}]</span> Gork GPT: ${response.substring(0, i + 1)}`;
      i++;
      chatOutput.scrollTop = chatOutput.scrollHeight;
    } else {
      clearInterval(typingEffect);
      hideTypingIndicator();

      memory.conversation.push({ role: 'bot', content: response });
      memory.lastResponses.push(response);
      if (memory.lastResponses.length > 5) memory.lastResponses.shift();
      if (memory.conversation.length > MAX_MEMORY) {
        memory.conversation.shift();
      }
    }
  }, speed);
}

function analyzeInput(input) {
  if (input.startsWith('/')) {
    const parts = input.split(' ');
    const command = parts[0].substring(1).toLowerCase();
    const argument = parts.slice(1).join(' ');
    return commands[command] ? commands[command](argument) : getRandomItem(knowledgeBase.responses.unknown);
  }

  const lowerInput = input.toLowerCase();
  const lastExchange = memory.conversation[memory.conversation.length - 1];

  if (lastExchange && lastExchange.content.includes("how are you")) {
    if (/(good|great|fine|excellent|bullish)/i.test(input)) {
      memory.userState = 'good';
      return getRandomItem(knowledgeBase.personal.userGood);
    }
    if (/(bad|terrible|not good|bearish)/i.test(input)) {
      memory.userState = 'bad';
      return getRandomItem(knowledgeBase.personal.userBad);
    }
  }

  if (/(^hi|^hello|^hey|^gm)/i.test(input)) return getRandomItem(knowledgeBase.greetings);
  if (/(bye|goodbye|see ya|gn)/i.test(input)) return getRandomItem(knowledgeBase.farewell);
  if (/(how are you|how're you|how you)/i.test(input)) return getRandomItem(knowledgeBase.personal.howAreYou);

  if (/(project|gork|token|coin)/i.test(input)) {
    if (/(supply|circulating|max|total)/i.test(input)) return getRandomItem(knowledgeBase.project.tokenomics);
    if (/(goal|mission|purpose)/i.test(input)) return getRandomItem(knowledgeBase.project.goals);
    if (/(community|telegram|tg|discord)/i.test(input)) return getRandomItem(knowledgeBase.project.community);
    return getRandomItem(knowledgeBase.project.info);
  }

  if (/(crypto|blockchain|defi|nft)/i.test(input)) {
    if (/(solana|sol)/i.test(input)) {
      if (/(raydium|dex|swap)/i.test(input)) return getRandomItem(knowledgeBase.crypto.dex.raydium);
      if (/(pump|fun|memecoin)/i.test(input)) return getRandomItem(knowledgeBase.crypto.dex.pumpfun);
      return getRandomItem(knowledgeBase.crypto.solana);
    }
    if (/(bitcoin|btc)/i.test(input)) return getRandomItem(knowledgeBase.crypto.bitcoin);
    if (/(ethereum|eth)/i.test(input)) return getRandomItem(knowledgeBase.crypto.ethereum);
    if (/(meme|pepe|doge|shib)/i.test(input)) return getRandomItem(knowledgeBase.crypto.memecoins);
    if (/(dexscreener|chart|price)/i.test(input)) return getRandomItem(knowledgeBase.crypto.tools.dexscreener);
    if (/(marketcap|mcap|valuation)/i.test(input)) return getRandomItem(knowledgeBase.crypto.metrics.marketcap);
    if (/(supply|circulating)/i.test(input)) return getRandomItem(knowledgeBase.crypto.metrics.supply);
    return getRandomItem(knowledgeBase.crypto.general);
  }

  if (/(ca|contract|address)/i.test(input)) {
    const caText = document.getElementById("caLine").textContent;
    return caText.replace(/^ca:\s*/i, 'Contract address: ');
  }

  if (/(ticker|symbol)/i.test(input)) return "Our ticker is $GORKGPT - the smartest crypto AI token!";

  if (memory.userState === 'good') return getRandomItem(knowledgeBase.responses.positive);
  if (memory.userState === 'bad') return getRandomItem(knowledgeBase.responses.negative);
  return getRandomItem(knowledgeBase.responses.unknown);
}

// Event handlers
function handleUserInput() {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  addMessageToChat('user', userInput);
  chatInput.value = "";
  chatOutput.scrollTop = chatOutput.scrollHeight;

  const response = analyzeInput(userInput);
  simulateTyping(response, () => {});
}

// Event listeners
sendButton.addEventListener("click", handleUserInput);
chatInput.addEventListener("keydown", (e) => e.key === "Enter" && handleUserInput());
commandHelp.addEventListener("click", showHelp);
closeHelpButton.addEventListener("click", closeHelp);
helpModal.addEventListener("click", (e) => e.target === helpModal && closeHelp());

// Initial greeting
setTimeout(() => {
  addMessageToChat('bot', "Welcome to Gork GPT - your crypto AI assistant! Type /help for commands.");
}, 500);
