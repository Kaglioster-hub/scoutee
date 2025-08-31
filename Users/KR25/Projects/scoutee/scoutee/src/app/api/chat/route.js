// src/app/api/chat/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODELS = [
  "HuggingFaceH4/zephyr-7b-alpha",
  "mistralai/Mistral-7B-Instruct-v0.2",
];

function withTimeout(promise, ms = 15000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

async function askHF(message, model, key) {
  const url = `https://api-inference.huggingface.co/models/${model}`;
  const r = await withTimeout(fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    // text-generation compat
    body: JSON.stringify({
      inputs: message,
      parameters: {
        max_new_tokens: 120,
        temperature: 0.7,
        return_full_text: false,
      },
      options: {
        wait_for_model: true,
        use_cache: false,
      },
    }),
    cache: "no-store",
  }), 15000);

  const text = await r.text();
  if (!r.ok) {
    throw new Error(`HF ${model} ${r.status}: ${text.slice(0, 180)}`);
  }

  // Il payload può essere array o oggetto singolo
  let data;
  try { data = JSON.parse(text); } catch { data = {}; }

  return (
    data?.[0]?.generated_text ||
    data?.generated_text ||
    "…no reply"
  );
}

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return Response.json({ reply: "Dimmi qualcosa :)" }, { status: 400 });
    }

    const key = process.env.HF_API_KEY;
    if (!key) {
      return Response.json(
        { reply: "⚠️ HF_API_KEY mancante in ambiente. Aggiungila su Vercel e fai redeploy." },
        { status: 500 }
      );
    }

    // prova i modelli in ordine
    let lastErr;
    for (const m of MODELS) {
      try {
        const reply = await askHF(message, m, key);
        return Response.json({ reply });
      } catch (e) {
        lastErr = e;
      }
    }

    return Response.json(
      { reply: `⚠️ Errore HuggingFace: ${lastErr?.message || "unknown"}` },
      { status: 502 }
    );
  } catch (e) {
    return Response.json(
      { reply: `⚠️ Errore interno: ${e?.message || "unknown"}` },
      { status: 500 }
    );
  }
}
