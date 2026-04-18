/**
 * Apollo & Cassandra VN - Story Mode Engine
 */

const bg = document.getElementById("background");
const cassandra = document.getElementById("cassandraSprite");
const apollo = document.getElementById("apolloSprite");
const nameEl = document.getElementById("speakerName");
const textEl = document.getElementById("dialogueText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextSun");
const nextBtnContainer = document.getElementById("nextBtnContainer");

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

let state = {
    node: "start",
    line: 0,
    typing: false,
    skip: false
};

/**
 * Core Rendering
 */
function render() {
    const node = window.STORY[state.node];
    
    // Safety check: If node doesn't exist, log error
    if (!node) {
        console.error("Story node not found:", state.node);
        return;
    }

    const line = node.lines[state.line];

    // Reset UI visibility for dialogue
    choicesEl.classList.add("hidden");
    nextBtnContainer.classList.remove("hidden");

    // Set Speaker Name
    nameEl.textContent = line.speaker || "";
    
    // Set Background (Only updates if defined in story.js)
    if (line.bg && assets.backgrounds[line.bg]) {
        bg.style.backgroundImage = `url('${assets.backgrounds[line.bg]}')`;
    }

    // Set Sprite Highlights
    const active = (line.sprite || "").toLowerCase();
    if (active === "cassandra") {
        cassandra.className = "sprite active";
        apollo.className = "sprite inactive";
    } else if (active === "apollo") {
        apollo.className = "sprite active";
        cassandra.className = "sprite inactive";
    } else {
        // Both dim for narration
        apollo.className = "sprite inactive";
        cassandra.className = "sprite inactive";
    }

    // Start Typewriter
    typeText(line.text);
}

/**
 * Typewriter Effect
 */
function typeText(text) {
    state.typing = true;
    state.skip = false;
    textEl.textContent = "";
    
    let i = 0;
    // Speed: 25ms is standard, 15ms is fast
    const speed = 25; 

    const interval = setInterval(() => {
        if (state.skip || i >= text.length) {
            textEl.textContent = text;
            state.typing = false;
            state.skip = false;
            clearInterval(interval);
        } else {
            textEl.textContent += text[i];
            i++;
        }
    }, speed);
}

/**
 * Progressing Dialogue
 */
function handleNext() {
    // If mid-type, skip to full text
    if (state.typing) {
        state.skip = true;
        return;
    }

    const node = window.STORY[state.node];
    state.line++;

    // Check if we finished the lines in this node
    if (state.line >= node.lines.length) {
        if (node.choices && node.choices.length > 0) {
            showChoices(node.choices);
        } else {
            // End of script fallback
            nameEl.textContent = "";
            textEl.textContent = "The prophecy fades into silence...";
            nextBtnContainer.classList.add("hidden");
        }
    } else {
        render();
    }
}

/**
 * Choice Handling
 */
function showChoices(choices) {
    nextBtnContainer.classList.add("hidden");
    choicesEl.classList.remove("hidden");
    choicesEl.innerHTML = "";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.text;
        btn.onclick = () => {
            state.node = choice.next;
            state.line = 0;
            state.skip = false;
            render();
        };
        choicesEl.appendChild(btn);
    });
}

/**
 * Inputs
 */
nextBtn.onclick = handleNext;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        // Only advance via keyboard if choices aren't on screen
        if (choicesEl.classList.contains("hidden")) {
            handleNext();
        }
    }
});

/**
 * Init
 */
window.onload = () => {
    // Ensure sprites are linked to the right images
    cassandra.src = assets.sprites.cassandra;
    apollo.src = assets.sprites.apollo;

    // Small delay to ensure images are ready before showing app
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        const app = document.getElementById("app");
        if (loader) loader.style.display = "none";
        if (app) app.classList.remove("hidden");
        render();
    }, 600);
};
