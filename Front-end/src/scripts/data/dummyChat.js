/** @format */

const canned = [
  "Keren! Boleh ceritain skill apa yang ingin kamu kembangkan?",
  "Bagus! Untuk level beginner, aku rekomendasikan mulai dari dasar dulu: konsep, praktek kecil, dan project mini.",
  "Untuk minggu ini, skill yang berkembang: Problem Solving dan JavaScript dasar. Tetap konsisten ya!",
  "Rekomendasi kursus Dicoding: 'Fundamental Front-End Development' atau 'Dasar JavaScript'.",
  "Tetap semangat! Ingat: belajar sedikit tiap hari lebih efektif daripada lompat-lompat.",
  "Bisa bantu bikin roadmap — ketik: buat roadmap",
  "Sepertinya aku belum ngerti, bisa ulangi dengan kata lain?",
];

export function getBotReply(userMessage = "") {
  const text = (userMessage || "").toLowerCase();

  if (!text.trim()) {
    return "Maaf, saya tidak menerima pesan kosong. Coba ketik sesuatu ya!";
  }
  if (text.includes("halo") || text.includes("hi") || text.includes("hai")) {
    return "Halo! Aku Learning Buddy. Mau mulai assessment atau langsung tanya rekomendasi kursus?";
  }
  if (
    text.includes("assess") ||
    text.includes("assessment") ||
    text.includes("mulai")
  ) {
    return "Oke, kita mulai assessment singkat: pilih job role yang ingin kamu capai (mis. Front-end Developer, Data Engineer).";
  }
  if (text.includes("roadmap") || text.includes("buat roadmap")) {
    return "Baik, aku buat roadmap singkat: 1) Dasar - JavaScript/HTML/CSS, 2) Intermediate - Framework & Testing, 3) Advanced - Performance & Architecture.";
  }
  if (text.includes("rekomendasi") || text.includes("kursus")) {
    return "Rekomendasi kursus: 'Fundamental Front-End', 'Belajar JavaScript: dari Dasar ke Mahir', 'Membangun Aplikasi Web Sederhana'.";
  }
  if (text.includes("terima kasih") || text.includes("thanks")) {
    return "Sama-sama! Kalau mau lanjut, ketik 'lanjut' atau 'roadmap'.";
  }

  const idx = text.length % canned.length;
  return canned[idx];
}
