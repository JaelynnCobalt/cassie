window.STORY = {
  start: {
    lines: [
      { speaker: "Apollo", text: "You keep walking into my temple like you already belong here.", sprite: "apollo", bg: "temple" },
      { speaker: "Cassandra", text: "I don’t belong anywhere. I just get dragged into places with better lighting.", sprite: "cassandra" }
    ],
    choices: [
      { text: "Tease him", next: "start_tease" },
      { text: "Be blunt", next: "start_blunt" },
      { text: "Stay silent", next: "start_silent" }
    ]
  },

  // EXPANSIONS
  start_tease: {
    lines: [
      { speaker: "Cassandra", text: "Careful, Apollo. If I stay too long, people might start thinking you actually like the company.", sprite: "cassandra" },
      { speaker: "Apollo", text: "The sun does not 'like' things, Cassandra. It simply observes. But you... you are a particularly loud observation.", sprite: "apollo" }
    ],
    choices: [
      { text: "Continue...", next: "next_plot_point" }
    ]
  },

  start_blunt: {
    lines: [
      { speaker: "Cassandra", text: "If the God of Truth can't handle a guest, perhaps he should invest in a sturdier lock.", sprite: "cassandra" },
      { speaker: "Apollo", text: "A lock would not stop a curse, and it certainly wouldn't stop you. You have a way of finding the cracks in everything.", sprite: "apollo" }
    ],
    choices: [
      { text: "Continue...", next: "next_plot_point" }
    ]
  },

  start_silent: {
    lines: [
      { speaker: "Narration", text: "You simply stare at him, the weight of a thousand unspoken futures resting between you.", sprite: "" },
      { speaker: "Apollo", text: "Silence suits you. It’s the only time the world isn't screaming at you to listen to its end.", sprite: "apollo" }
    ],
    choices: [
      { text: "Continue...", next: "next_plot_point" }
    ]
  },

  next_plot_point: {
    lines: [
      { speaker: "Apollo", text: "But tell me... why have you really come today?", sprite: "apollo", bg: "temple" }
    ],
    choices: [
      { text: "Ask for a gift", next: "gift_path" },
      { text: "Warn him", next: "warn_path" },
      { text: "Leave", next: "leave_path" }
    ]
  }
};
