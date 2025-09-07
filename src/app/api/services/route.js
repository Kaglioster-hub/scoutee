import data from "@/data/scoutee_master.json";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  const services = data?.services || [];
  return new Response(JSON.stringify(services), {
    headers: { "Content-Type": "application/json" },
  });
}
