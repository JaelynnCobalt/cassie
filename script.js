const bg = document.getElementById("background");
const cassandra = document.getElementById("cassandraSprite");
const apollo = document.getElementById("apolloSprite");

const nameEl = document.getElementById("speakerName");
const textEl = document.getElementById("dialogueText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextSun");

const sprites = {
  apollo: "assets/apollo.png",
  cassandra: "assets/cassandra.png"
};

const backgrounds = {
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

/* UI */
function resetUI() {
  choicesEl.innerHTML = "";
  nextBtn.style.display = "block";
}

/* BACKGROUND */
function setBackground(key) {
  bg.style.backgroundImage = backgrounds[key]
    ? `url("${backgrounds[key]}")`
    : "";
}

/* SPRITES */
function setSprites(active) {
  cassandra.src = sprites.cassandra;
  apollo.src = sprites.apollo;

  cassandra.className = "sprite";
  apollo.className = "sprite";

  if (active === "cassandra") {
    cassandra.classList.add("active");
    apollo.classList.add("inactive");
  } else if (active === "apollo") {
    apollo.classList.add("active");
    cassandra.classList.add("inactive");
  } else {
    cassandra.classList.add("inactive");
    apollo.classList.add("inactive");
  }
}

/* TYPE */
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
      setTimeout(tick, 18);
    } else {
      state.typing = false;
    }
  }

  tick();
}

/* RENDER */
function render() {
  const story = getStory();
  const node = story[state.node];

  if (!node) {
    console.error("Missing node:", state.node);
    return;
  }

  const line = node.lines[state.line];

  resetUI();

  if (!line) return renderChoices();

  nameEl.textContent = line.speaker || "";
  setBackground(line.bg);
  setSprites(line.sprite);
  type(line.text);
}

/* NEXT */
function next() {
  if (state.typing) {
    state.skip = true;
    return;
  }

  const story = getStory();
  const node = story[state.node];

  state.line++;

  if (state.line >= node.lines.length) {
    renderChoices();
  } else {
    render();
  }
}

/* CHOICES */
function renderChoices() {
  const story = getStory();
  const node = story[state.node];

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

/* INPUT */
nextBtn.onclick = next;

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    next();
  }
});

/* START */
window.addEventListener("load", () => {
  cassandra.src = sprites.cassandra;
  apollo.src = sprites.apollo;

  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("app").classList.remove("hidden");

  render();
});
