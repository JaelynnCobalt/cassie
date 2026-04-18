window.STORY = {
  start: {
    lines: [
      { speaker: "Apollo", text: "You keep walking into my temple like you already belong here.", sprite: "apollo", bg: "temple" },
      { speaker: "Cassandra", text: "I don’t belong anywhere. I just get dragged into places with better lighting.", sprite: "cassandra" }
    ],
    choices: [
      { text: "Ask why he watches you", next: "bond2" }
    ]
  },
  bond2: {
    lines: [
      { speaker: "Apollo", text: "Because the future gets louder when I look away.", sprite: "apollo", bg: "temple" }
    ],
    choices: []
  }
};
