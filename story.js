window.STORY = {
  start: {
    lines: [
      {
        speaker: "Apollo",
        text: "You keep walking into my temple like you already belong here.",
        sprite: "apollo",
        bg: "temple"
      },
      {
        speaker: "Cassandra",
        text: "I don’t belong anywhere. I just get dragged into places with better lighting.",
        sprite: "cassandra"
      },
      {
        speaker: "Apollo",
        text: "And yet you never leave.",
        sprite: "apollo"
      },
      {
        speaker: "Cassandra",
        text: "Neither do you.",
        sprite: "cassandra"
      }
    ],
    choices: [
      { text: "Tease him", next: "bond1" },
      { text: "Ask why he watches you", next: "bond2" }
    ]
  },

  bond1: {
    lines: [
      {
        speaker: "Cassandra",
        text: "Is this your idea of divine entertainment?",
        sprite: "cassandra",
        bg: "temple"
      },
      {
        speaker: "Apollo",
        text: "You make silence feel alive.",
        sprite: "apollo"
      }
    ],
    choices: [
      { text: "Stay", next: "choice_split" }
    ]
  },

  bond2: {
    lines: [
      {
        speaker: "Apollo",
        text: "Because the future gets louder when I look away.",
        sprite: "apollo",
        bg: "temple"
      }
    ],
    choices: [
      { text: "Stay anyway", next: "choice_split" }
    ]
  },

  choice_split: {
    lines: [
      {
        speaker: "Narration",
        text: "A vision fractures: burning ships… Troy.",
        sprite: "cassandra",
        bg: "marble"
      },
      {
        speaker: "Apollo",
        text: "Stay with me — as yourself.",
        sprite: "apollo"
      }
    ],
    choices: [
      { text: "Accept him", next: "romance" },
      { text: "Reject him", next: "curse" }
    ]
  },

  romance: {
    lines: [
      {
        speaker: "Cassandra",
        text: "If I stay… it has to be my choice.",
        sprite: "cassandra",
        bg: "temple"
      },
      {
        speaker: "Apollo",
        text: "Then choose me freely.",
        sprite: "apollo"
      }
    ],
    choices: []
  },

  curse: {
    lines: [
      {
        speaker: "Apollo",
        text: "Then you will see Troy fall… and no one will believe you.",
        sprite: "apollo",
        bg: "marble"
      }
    ],
    choices: []
  }
};
