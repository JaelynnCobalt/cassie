const bg = document.getElementById("bg");
const apollo = document.getElementById("apollo");
const cassandra = document.getElementById("cassandra");

const speaker = document.getElementById("speaker");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const next = document.getElementById("next");

const sprites = {
  apollo: "assets/apollo.png",
  cassandra: "assets/cassandra.png"
};

const backgrounds = {
  temple: "assets/temple-bg.jpg",
  marble: "assets/marble-bg.jpg"
};

let node = "start";
let line = 0;
let typing = false;
let skip = false;

function render() {
  const scene = window.STORY[node];
  const data = scene.lines[line];

  if (!data) return showChoices();

  choices.innerHTML = "";
  next.style.display = "block";

  speaker.textContent = data.speaker || "";
  setBG(data.bg);
  setSprites(data.sprite);
  type(data.text);
}

function setBG(bgKey) {
  bg.style.backgroundImage = backgrounds[bgKey]
    ? `url(${backgrounds[bgKey]})`
    : "";
}

function setSprites(active) {
  apollo.src = sprites.apollo;
  cassandra.src = sprites.cassandra;

  apollo.style.opacity = active === "apollo" ? "1" : "0.3";
  cassandra.style.opacity = active === "cassandra" ? "1" : "0.3";
}

function type(txt) {
  typing = true;
  text.textContent = "";

  let i = 0;

  function tick() {
    if (skip) {
      text.textContent = txt;
      typing = false;
      skip = false;
      return;
    }

    if (i < txt.length) {
      text.textContent += txt[i++];
      setTimeout(tick, 20);
    } else {
      typing = false;
    }
  }

  tick();
}

function nextLine() {
  if (typing) return skip = true;

  line++;
  const scene = window.STORY[node];

  if (line >= scene.lines.length) {
    showChoices();
  } else {
    render();
  }
}

function showChoices() {
  const scene = window.STORY[node];

  next.style.display = "none";

  scene.choices.forEach(c => {
    const b = document.createElement("button");
    b.textContent = c.text;

    b.onclick = () => {
      node = c.next;
      line = 0;
      render();
    };

    choices.appendChild(b);
  });
}

next.onclick = nextLine;

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "Enter") nextLine();
});

window.onload = () => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("game").classList.remove("hidden");

  render();
};
