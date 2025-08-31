"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBotAI() {
  const [m, setM] = useState([{ from: "bot", text: "Hi! I am Scoutee AI 🚀" }]);
  const [i, setI] = useState("");
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
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-900 border rounded-xl shadow-xl flex flex-col">
      <div className="p-3 h-56 overflow-y-auto text-sm space-y-2">
        {m.map((x, k) => (
          <div
            key={k}
            className={`px-2 py-1 rounded-md max-w-[90%] ${
              x.from === "bot"
                ? "bg-primary/10 text-primary font-medium self-start"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-end"
            }`}
          >
            {x.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex border-t">
        <input
          value={i}
          onChange={(e) => setI(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          className="flex-1 p-2 text-sm bg-transparent outline-none"
        />
        <button
          onClick={send}
          className="px-3 bg-primary text-white rounded-r-xl hover:bg-primary-dark transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
