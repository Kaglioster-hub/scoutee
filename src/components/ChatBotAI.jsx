"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBotAI() {
  const [m, setM] = useState([{ from: "bot", text: "Hi! I am Scoutee AI 🚀" }]);
  const [i, setI] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Scroll sempre all'ultimo messaggio
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [m]);

  const send = async () => {
    if (!i.trim()) return;
    const userMsg = i;
    setM((v) => [...v, { from: "user", text: userMsg }]);
    setI("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!r.ok) throw new Error("API error");
      const d = await r.json();
      setM((v) => [...v, { from: "bot", text: d.reply || "(no reply)" }]);
    } catch {
      setM((v) => [
        ...v,
        { from: "bot", text: "⚠️ Offline — try SOS or Uber." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white px-3 py-2 text-sm font-semibold flex items-center justify-between">
        Scoutee AI 🤖
      </div>

      {/* Messages */}
      <div className="p-3 h-56 overflow-y-auto text-sm space-y-2">
        {m.map((x, k) => (
          <div
            key={k}
            className={`px-3 py-2 rounded-lg max-w-[85%] ${
              x.from === "bot"
                ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium self-start"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-end"
            }`}
          >
            {x.text}
          </div>
        ))}
        {loading && (
          <div className="px-3 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs animate-pulse self-start">
            Typing...
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex border-t border-[var(--card-border)]">
        <input
          value={i}
          onChange={(e) => setI(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          aria-label="Chat input"
          className="flex-1 p-2 text-sm bg-transparent outline-none"
        />
        <button
          onClick={send}
          title="Send message"
          aria-label="Send message"
          className="px-3 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
