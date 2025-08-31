export async function POST(req) {
  try {
    const { message } = await req.json();

    const HF_MODEL = "HuggingFaceH4/zephyr-7b-alpha";

    const r = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await r.json();
    const reply =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "⚠️ Nessuna risposta dal modello.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ reply: "⚠️ Errore HuggingFace" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
