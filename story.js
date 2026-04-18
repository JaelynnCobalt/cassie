window.STORY = {
  // --- ACT 1: THE TEMPLE ---
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

  // --- BRANCHES FOR START ---
  start_tease: {
    lines: [
      { speaker: "Cassandra", text: "Careful, Apollo. If I stay too long, people might start thinking you actually like the company.", sprite: "cassandra" },
      { speaker: "Apollo", text: "The sun does not 'like' things, Cassandra. It simply observes. But you... you are a particularly loud observation.", sprite: "apollo" }
    ],
    choices: [
      { text: "Look at the horizon", next: "the_vision" }
    ]
  },

  start_blunt: {
    lines: [
      { speaker: "Cassandra", text: "If the God of Truth can't handle a guest, perhaps he should invest in a sturdier lock.", sprite: "cassandra" },
      { speaker: "Apollo", text: "A lock would not stop a curse, and it certainly wouldn't stop you. You have a way of finding the cracks in everything.", sprite: "apollo" }
    ],
    choices: [
      { text: "Look at the horizon", next: "the_vision" }
    ]
  },

  start_silent: {
    lines: [
      { speaker: "Narration", text: "You simply stare at him, the weight of a thousand unspoken futures resting between you.", sprite: "" },
      { speaker: "Apollo", text: "Silence suits you. It’s the only time the world isn't screaming at you to listen to its end.", sprite: "apollo" }
    ],
    choices: [
      { text: "Look at the horizon", next: "the_vision" }
    ]
  },

  // --- ACT 2: THE VISION ---
  the_vision: {
    lines: [
      { speaker: "Narration", text: "The sky shifts. The orange sunset bleeds into a deep, sickly crimson. You see smoke on the wind.", bg: "marble" },
      { speaker: "Cassandra", text: "The ships... they aren't coming to trade, are they?", sprite: "cassandra" },
      { speaker: "Apollo", text: "They come to bring a legacy to its knees. Do you want to see how it ends?", sprite: "apollo" }
    ],
    choices: [
      { text: "I want to know the truth", next: "path_truth" },
      { text: "I want to stop it", next: "path_action" },
      { text: "I want to forget", next: "path_forget" }
    ]
  },

  // --- BRANCHES FOR THE VISION ---
  path_truth: {
    lines: [
      { speaker: "Apollo", text: "Truth is a heavy crown, Cassandra. Once I place it on your head, you can never take it off.", sprite: "apollo" },
      { speaker: "Cassandra", text: "I'd rather choke on the truth than drown in a lie.", sprite: "cassandra" }
    ],
    choices: [
      { text: "Accept the gift", next: "end_demo" }
    ]
  },

  path_action: {
    lines: [
      { speaker: "Apollo", text: "You wish to fight the Fates? Even I do not play such dangerous games.", sprite: "apollo" },
      { speaker: "Cassandra", text: "Then you are a coward. I will shout until my throat bleeds.", sprite: "cassandra" }
    ],
    choices: [
      { text: "Prepare for the fallout", next: "end_demo" }
    ]
  },

  path_forget: {
    lines: [
      { speaker: "Cassandra", text: "Just for one hour... let me be a girl who doesn't know the world is burning.", sprite: "cassandra" },
      { speaker: "Apollo", text: "Close your eyes. I cannot change what is coming, but I can lend you my light for a moment.", sprite: "apollo" }
    ],
    choices: [
      { text: "Close your eyes", next: "end_demo" }
    ]
  },

  // --- THE END ---
  end_demo: {
    lines: [
      { speaker: "Narration", text: "The vision fades, leaving you standing in the cold marble silence of the temple.", bg: "temple" },
      { speaker: "Apollo", text: "We shall see which path you truly walk when the fire starts.", sprite: "apollo" },
      { speaker: "Narration", text: "--- END OF DEMO ---", sprite: "" }
    ],
    choices: []
  }
};
