/** @format */

export function createMessageBubble({ text = "", isUser = false, time = "" }) {
  const row = document.createElement("div");
  row.className = "msg-row " + (isUser ? "user" : "bot");

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble " + (isUser ? "user" : "bot");
  bubble.innerText = text;

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.innerText = time || "";

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.appendChild(bubble);
  container.appendChild(meta);

  row.appendChild(container);
  return row;
}
