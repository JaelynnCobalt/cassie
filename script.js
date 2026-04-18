const bg = document.getElementById("background");
const cassandra = document.getElementById("cassandraSprite");
const apollo = document.getElementById("apolloSprite");
const nameEl = document.getElementById("speakerName");
const textEl = document.getElementById("dialogueText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextSun");
const nextBtnContainer = document.getElementById("nextBtnContainer");

const sprites = {
    apollo: "assets/apollo.png",
    cassandra: "assets/cassandra.png"
};

const backgrounds = {
    // Updated to .jpg to match your GitHub screenshot
    temple: "assets/temple-bg.jpg",
    marble: "assets/marble-bg.jpg"
};

let state = {
    node: "start",
    line: 0,
    typing: false,
    skip: false
};

function getStory() {
    return window.STORY;
}

function setBackground(key) {
    if (key && backgrounds[key]) {
        bg.style.backgroundImage = `url("${backgrounds[key]}")`;
    }
}

function setSprites(active) {
    if (active === "cassandra") {
        cassandra.classList.add("active");
        cassandra.classList.remove("inactive");
        apollo.classList.add("inactive");
        apollo.classList.remove("active");
    } else if (active === "apollo") {
        apollo.classList.add("active");
        apollo.classList.remove("inactive");
        cassandra.classList.add("inactive");
        cassandra.classList.remove("active");
    } else {
        cassandra.classList.add("inactive");
        apollo.classList.add("inactive");
    }
}

function type(text) {
    state.typing = true;
    textEl.textContent = "";
    let i = 0;

    function tick() {
        if (state.skip) {
            textEl.textContent = text;
            state.typing = false;
            state.skip = false;
            return;
        }

        if (i < text.length) {
            textEl.textContent += text[i++];
            setTimeout(tick, 25);
        } else {
            state.typing = false;
        }
    }
    tick();
}

function render() {
    const story = getStory();
    const node = story[state.node];
    const line = node.lines[state.line];

    choicesEl.classList.add("hidden");
    if (nextBtnContainer) nextBtnContainer.classList.remove("hidden");

    if (!line) return;

    nameEl.textContent = line.speaker || "";
    if (line.bg) setBackground(line.bg);
    setSprites(line.sprite);
    type(line.text);
}

function next() {
    if (state.typing) {
        state.skip = true;
        return;
    }

    const story = getStory();
    const node = story[state.node];
    state.line++;

    if (state.line >= node.lines.length) {
        if (node.choices && node.choices.length > 0) {
            renderChoices();
        } else {
            textEl.textContent = "The End.";
            if (nextBtnContainer) nextBtnContainer.classList.add("hidden");
        }
    } else {
        render();
    }
}

function renderChoices() {
    const story = getStory();
    const node = story[state.node];

    if (nextBtnContainer) nextBtnContainer.classList.add("hidden");
    choicesEl.classList.remove("hidden");
    choicesEl.innerHTML = "";

    node.choices.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = c.text;
        btn.onclick = () => {
            state.node = c.next;
            state.line = 0;
            state.skip = false;
            render();
        };
        choicesEl.appendChild(btn);
    });
}

nextBtn.onclick = next;

document.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (!choicesEl.classList.contains("hidden")) return;
        next();
    }
});

window.addEventListener("load", () => {
    cassandra.src = sprites.cassandra;
    apollo.src = sprites.apollo;

    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        const app = document.getElementById("app");
        if (loader) loader.style.display = "none";
        if (app) app.classList.remove("hidden");
        render();
    }, 500);
});
