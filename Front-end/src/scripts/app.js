/** @format */

import "../styles/styles.css";
import ChatBox from "./components/chatBox.js";

document.addEventListener("DOMContentLoaded", () => {
  const chat = new ChatBox({ container: document.body });
  chat.mount();
});
