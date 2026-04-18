window.STORY = {
  start: {
    lines: [
      {
        speaker: "Apollo",
        text: "Welcome to the clean build. If you see this, everything works.",
        sprite: "apollo",
        bg: "temple"
      },
      {
        speaker: "Cassandra",
        text: "So… we finally escaped the broken version?",
        sprite: "cassandra"
      }
    ],
    choices: [
      { text: "Yes", next: "path1" },
      { text: "No", next: "path2" }
    ]
  },

  path1: {
    lines: [
      {
        speaker: "Apollo",
        text: "Good. Now we can actually build your story properly.",
        sprite: "apollo",
        bg: "marble"
      }
    ],
    choices: []
  },

  path2: {
    lines: [
      {
        speaker: "Cassandra",
        text: "Great. We’re still stuck in debugging hell.",
        sprite: "cassandra",
        bg: "marble"
      }
    ],
    choices: []
  }
};
