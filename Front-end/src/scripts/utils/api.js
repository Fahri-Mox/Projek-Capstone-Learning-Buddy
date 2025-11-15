/** @format */

import { getBotReply } from "../data/dummyChat.js";

export function sendMessage(userMessage) {
  return new Promise((resolve) => {
    const latency = 550 + Math.random() * 700;
    setTimeout(() => {
      const reply = getBotReply(userMessage);
      resolve({ reply });
    }, latency);
  });
}

export function getInitialOnboarding() {
  return Promise.resolve({
    welcome:
      'Halo! Aku Learning Buddy — aku bantu susun roadmap & rekomendasi belajar sesuai skill kamu. Coba sapa aku atau ketik "mulai assessment".',
  });
}
