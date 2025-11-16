/** @format */

import { createMessageBubble } from "./messageBubble.js";
import { sendMessage, getInitialOnboarding } from "../utils/api.js";

function formatTime(date = new Date()) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default class ChatBox {
  constructor({ container = document.body } = {}) {
    this.container = container;
    this.el = null;
    this.fab = null;
    this.messagesEl = null;
    this.roadmapEl = null;
    this.inputEl = null;
    this.inputArea = null;
    this.sendBtn = null;
    this.activeTab = "chat";
  }

  mount() {
    this.fab = document.createElement("button");
    this.fab.className = "lb-fab";
    this.fab.setAttribute("aria-label", "Open Learning Buddy");
    this.fab.innerHTML = /*svg*/ `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3C7.03 3 3 6.58 3 11c0 2.12.92 4.05 2.44 5.51L5 21l4.72-1.62C10.37 19.5 11.17 19.75 12 19.75 16.97 19.75 21 16.17 21 11.75 21 7.33 16.97 3 12 3z" fill="white" opacity="0.9"/>
      </svg>
    `;
    this.container.appendChild(this.fab);

    this.el = document.createElement("div");
    this.el.className = "lb-chat lb-hidden";
    this.el.innerHTML = this._template();
    this.container.appendChild(this.el);

    // refs
    this.messagesEl = this.el.querySelector(".lb-messages");
    this.roadmapEl = this.el.querySelector(".lb-roadmap");
    this.inputEl = this.el.querySelector(".lb-input");
    this.inputArea = this.el.querySelector(".lb-input-area"); // <-- input wrapper
    this.sendBtn = this.el.querySelector(".lb-send");
    this.tabChat = this.el.querySelector('[data-tab="chat"]');
    this.tabRoadmap = this.el.querySelector('[data-tab="roadmap"]');
    this.closeBtn = this.el.querySelector(".lb-close");

    this.fab.addEventListener("click", (e) => {
      this.toggle();
    });
    this.closeBtn.addEventListener("click", () => this.hide());
    this.sendBtn.addEventListener("click", () => this._onSend());
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this._onSend();
      }
    });

    this.tabChat.addEventListener("click", () => this.switchTab("chat"));
    this.tabRoadmap.addEventListener("click", () => this.switchTab("roadmap"));

    getInitialOnboarding().then(({ welcome }) => {
      this._appendBotMessage(welcome);
    });

    document.addEventListener("click", (ev) => {
      const target = ev.target;
      if (
        !this.el.contains(target) &&
        target !== this.fab &&
        !this.fab.contains(target)
      ) {
        if (window.innerWidth < 480) this.hide();
      }
    });
  }

  _template() {
    return `
      <div class="lb-header">
        <div style="display:flex; flex-direction:column; flex:1;">
          <div class="title">Learning Buddy</div>
          <div class="subtitle">Personal study assistant</div>
        </div>
        <button class="lb-close" title="Close" style="background:transparent; border:none; color:white; cursor:pointer; font-weight:700">×</button>
      </div>

      <div class="lb-tabs" role="tablist">
        <div class="lb-tab active" data-tab="chat" role="tab">Chat</div>
        <div class="lb-tab" data-tab="roadmap" role="tab">My Roadmap</div>
      </div>

      <div class="lb-body">
        <div class="lb-messages" aria-live="polite"></div>

        <div class="lb-roadmap" style="display:none;">
          <div class="roadmap-card">
            <h4>Roadmap singkat</h4>
            <p>Belum ada roadmap personal. Ketik "buat roadmap" di Chat untuk membuat roadmap singkat.</p>
          </div>
        </div>

        <div class="lb-input-area">
          <textarea class="lb-input" placeholder="Ketik pesan... (Enter untuk kirim)"></textarea>
          <button class="lb-send">Kirim</button>
        </div>
      </div>
    `;
  }

  toggle() {
    if (this.el.classList.contains("lb-hidden")) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.el.classList.remove("lb-hidden");
    this.switchTab(this.activeTab);
    setTimeout(() => {
      if (this.activeTab === "chat" && this.inputEl) this.inputEl.focus();
    }, 150);
  }

  hide() {
    this.el.classList.add("lb-hidden");
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    const chatTab = this.tabChat;
    const roadmapTab = this.tabRoadmap;

    if (tabName === "chat") {
      chatTab.classList.add("active");
      roadmapTab.classList.remove("active");
      this.el.querySelector(".lb-messages").style.display = "flex";
      this.el.querySelector(".lb-roadmap").style.display = "none";
      if (this.inputArea) this.inputArea.style.display = "flex";
      if (this.inputEl) this.inputEl.focus();
    } else {
      chatTab.classList.remove("active");
      roadmapTab.classList.add("active");
      this.el.querySelector(".lb-messages").style.display = "none";
      this.el.querySelector(".lb-roadmap").style.display = "flex";
      if (this.inputArea) {
        this.inputArea.style.display = "none";
        if (this.inputEl) {
          this.inputEl.value = "";
          this.inputEl.blur();
        }
      }
    }
  }

  _onSend() {
    const text = this.inputEl.value.trim();
    if (!text) return;
    const time = formatTime(new Date());
    const userNode = createMessageBubble({ text, isUser: true, time });
    this.messagesEl.appendChild(userNode);
    this._scrollToBottom();

    this.inputEl.value = "";
    this.inputEl.focus();

    sendMessage(text).then(({ reply }) => {
      this._appendBotMessage(reply);
    });
  }

  _appendBotMessage(text) {
    const time = formatTime(new Date());
    const botNode = createMessageBubble({ text, isUser: false, time });
    this.messagesEl.appendChild(botNode);
    this._scrollToBottom();
  }

  _scrollToBottom() {
    requestAnimationFrame(() => {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight + 200;
    });
  }
}
