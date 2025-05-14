// useMood.js
import { useState } from 'react';

const mood_indicator = {
  positives: ["happy", "excited", "proud", "grateful", "loved", "motivated", "peaceful", "relaxed", "calm", "confident", "hopeful", "joyful"],
  happys: ["happy", "excited", "proud", "grateful", "loved", "motivated", "peaceful", "relaxed", "calm", "confident", "hopeful", "joyful"],
  low: ["okay", "fine", "meh", "tired", "bored", "unmotivated", "lazy"],
  neutral: ["okay", "fine", "meh", "tired", "bored", "unmotivated", "lazy"],
  sad: ["sad", "depressed", "down", "lonely", "hopeless", "worthless", "isolated", "crying", "numb", "drained"],
  frustrated: ["angry", "mad", "frustrated", "annoyed", "pissed", "irritated", "furious", "hate"],
  angry: ["angry", "mad", "frustrated", "annoyed", "pissed", "irritated", "furious", "hate"],
  anxiety: ["anxious", "nervous", "scared", "overwhelmed", "worried", "panic", "overthinking", "pressure"],
  fear: ["anxious", "nervous", "scared", "overwhelmed", "worried", "panic", "overthinking", "pressure"],
  crisis: ["suicide", "die", "end it", "kill myself", "harm", "cut", "self-harm", "overdose", "jump", "disappear"],
  emergency: ["suicide", "die", "end it", "kill myself", "harm", "cut", "self-harm", "overdose", "jump", "disappear"]
};

export function useMood() {
  const [currMood, setCurrMood] = useState("");
  const [text, setText] = useState("");

  function vectorconfig(user_query) {
    for (const mood in mood_indicator) {
      for (const feeling of mood_indicator[mood]) {
        if (user_query.toLowerCase().includes(feeling)) {
          setCurrMood(mood_indicator[mood]);
          return;
        }
      }
    }
    setCurrMood("unknown"); // fallback if no match found
  }

  return { currMood, vectorconfig, text, setText };
}
