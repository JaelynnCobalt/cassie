/**
 * Apollo & Cassandra Visual Novel Engine
 * Harmonized for GitHub Pages
 */

// UI Element Selectors
const bg = document.getElementById("background");
const cassandra = document.getElementById("cassandraSprite");
const apollo = document.getElementById("apolloSprite");
const nameEl = document.getElementById("speakerName");
const textEl = document.getElementById("dialogueText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextSun");
const nextBtnContainer = document.getElementById("nextBtnContainer");

// Asset Mapping (Matches your GitHub file names)
const assets = {
    sprites: {
        apollo: "assets/apollo.png",
        cassandra: "assets/cassandra.png"
    },
    backgrounds: {
        temple: "assets/temple-bg.jpg",
        marble: "assets/marble-bg.jpg"
    }
};

// Game State
let state = {
    node: "start",
    line: 0,
    typing: false,
    skipText: false
};

/**
 * CORE FUNCTIONS
 */

function setBackground(key) {
    if (key && assets.backgrounds[key]) {
        bg.style.backgroundImage = `url("${assets.backgrounds[key]}")`;
    }
}

function setSprites(speakerKey) {
    // Normalizing keys to lowercase for safety
    const activeKey = speakerKey ? speakerKey.toLowerCase() : null;

    if (activeKey === "cassandra") {
        cassandra.classList.add("active");
        cassandra.classList.remove("inactive");
        apollo.classList.add("inactive");
        apollo.classList.remove("active");
    } else if (activeKey === "apollo") {
        apollo.classList.add("active");
        apollo.classList.remove("inactive");
        cassandra.classList.add("inactive");
        cassandra.classList.remove("active");
    } else {
        // Narration mode: both characters dim
        cassandra.classList.add("inactive");
        cassandra.classList.remove("active");
        apollo.classList.add("inactive");
        apollo.classList.remove("active");
    }
}

function typeEffect(text) {
    state.typing = true;
    state.skipText = false;
    textEl.textContent = "";
    
    let i = 0;
    const speed = 30; // Milliseconds per character

    function nextChar() {
        if (state.skipText) {
            textEl.textContent = text;
            state.typing = false;
            return;
        }

        if (i < text.length) {
            textEl.textContent += text.charAt(i);
            i++;
            setTimeout(nextChar, speed);
        } else {
            state.typing = false;
        }
    }
    nextChar();
}

function render() {
    const story = window.STORY;
    const currentNode = story[state.node];
    const currentLine = currentNode.lines[state.line];

    // Reset UI Visibility
    choicesEl.classList.add("hidden");
    if (nextBtnContainer) nextBtnContainer.classList.remove("hidden");

    if (!currentLine) return;

    // Update visuals
    nameEl.textContent = currentLine.speaker || "";
    if (currentLine.bg) setBackground(currentLine.bg);
    setSprites(currentLine.sprite || currentLine.speaker);
    
    // Start typing text
    typeEffect(currentLine.text);
}

function handleNext() {
    // If text is still typing, skip to the end of the line
    if (state.typing) {
        state.skipText = true;
        return;
    }

    const story = window.STORY;
    const currentNode = story[state.node];

    state.line++;

    // Check if we reached the end of the current dialogue block
    if (state.line >= currentNode.lines.length) {
        if (currentNode.choices && currentNode.choices.length > 0) {
            displayChoices(currentNode.choices);
        } else {
            // Reached the very end of the script
            nameEl.textContent = "";
            textEl.textContent = "The prophecy concludes here.";
            if (nextBtnContainer) nextBtnContainer.classList.add("hidden");
        }
    } else {
        render();
    }
}

function displayChoices(choices) {
    if (nextBtnContainer) nextBtnContainer.classList.add("hidden");
    choicesEl.classList.remove("hidden");
    choicesEl.innerHTML = "";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.text;
        btn.onclick = () => {
            state.node = choice.next;
            state.line = 0;
            render();
        };
        choicesEl.appendChild(btn);
    });
}

/**
 * EVENT LISTENERS
 */

// Sunsprite click to advance
nextBtn.onclick = handleNext;

// Keyboard support (Space/Enter)
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        // Don't advance via keyboard if player must make a choice
        if (choicesEl.classList.contains("hidden")) {
            handleNext();
        }
    }
});

// Initialization
window.addEventListener("load", () => {
    // Pre-assign sources to ensure images load
    cassandra.src = assets.sprites.cassandra;
    apollo.src = assets.sprites.apollo;

    // Small delay to hide loading screen smoothly
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        const app = document.getElementById("app");
        if (loader) loader.style.display = "none";
        if (app) app.classList.remove("hidden");
        render();
    }, 800);
});
