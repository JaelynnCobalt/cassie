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

let state = { node: "start", line: 0, typing: false, skip: false };

function render() {
    const node = window.STORY[state.node];
    const line = node.lines[state.line];

    choicesEl.classList.add("hidden");
    nextBtnContainer.classList.remove("hidden");

    nameEl.textContent = line.speaker || "";
    
    // Set Background
    if (line.bg && assets.backgrounds[line.bg]) {
        bg.style.backgroundImage = `url('${assets.backgrounds[line.bg]}')`;
    }

    // Set Sprites
    const active = line.sprite ? line.sprite.toLowerCase() : "";
    if (active === "cassandra") {
        cassandra.className = "sprite active";
        apollo.className = "sprite inactive";
    } else if (active === "apollo") {
        apollo.className = "sprite active";
        cassandra.className = "sprite inactive";
    } else {
        apollo.className = "sprite inactive";
        cassandra.className = "sprite inactive";
    }

    typeText(line.text);
}

function typeText(text) {
    state.typing = true;
    textEl.textContent = "";
    let i = 0;
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
    }, 30);
}

function handleNext() {
    if (state.typing) { state.skip = true; return; }
    
    const node = window.STORY[state.node];
    state.line++;

    if (state.line >= node.lines.length) {
        if (node.choices.length > 0) {
            showChoices(node.choices);
        } else {
            textEl.textContent = "End of Demo.";
        }
    } else {
        render();
    }
}

function showChoices(choices) {
    nextBtnContainer.classList.add("hidden");
    choicesEl.classList.remove("hidden");
    choicesEl.innerHTML = "";
    choices.forEach(c => {
        const b = document.createElement("button");
        b.className = "choice-btn";
        b.textContent = c.text;
        b.onclick = () => {
            state.node = c.next;
            state.line = 0;
            render();
        };
        choicesEl.appendChild(b);
    });
}

nextBtn.onclick = handleNext;

window.onload = () => {
    // Force image sources
    cassandra.src = assets.sprites.cassandra;
    apollo.src = assets.sprites.apollo;
    
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
        render();
    }, 500);
};
