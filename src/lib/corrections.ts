export type Correction = {
  wrong: string;
  correct: string;
  reason: string;
  pronunciation: string;
  ipa: string;
};

export type ChatMsg = {
  id: string;
  role: "ai" | "user";
  source: "audio" | "text";
  text: string;
  corrections?: Correction[];
};

export const seedMessages: ChatMsg[] = [
  { id: "m1", role: "ai", source: "text", text: "Hi Alex! Tell me about your weekend." },
  {
    id: "m2",
    role: "user",
    source: "audio",
    text: "I goed to the park with my friends.",
    corrections: [
      {
        wrong: "goed",
        correct: "went",
        reason:
          "‘Go’ is an irregular verb. Its simple past form is ‘went’, not ‘goed’. Use ‘went’ for finished actions in the past.",
        pronunciation: "wehnt",
        ipa: "/wɛnt/",
      },
    ],
  },
  { id: "m3", role: "ai", source: "text", text: "Nice! What did you do at the park?" },
  {
    id: "m4",
    role: "user",
    source: "audio",
    text: "We play football and eat pizza.",
    corrections: [
      {
        wrong: "play",
        correct: "played",
        reason:
          "Use the simple past tense for completed actions. Add ‑ed to regular verbs like ‘play’ → ‘played’.",
        pronunciation: "playd",
        ipa: "/pleɪd/",
      },
      {
        wrong: "eat",
        correct: "ate",
        reason: "‘Eat’ is irregular. The simple past is ‘ate’.",
        pronunciation: "ayt",
        ipa: "/eɪt/",
      },
    ],
  },
];
