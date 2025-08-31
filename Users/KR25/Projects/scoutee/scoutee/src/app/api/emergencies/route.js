import data from "@/data/scoutee_master.json";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  const emergencies = data?.emergencies || [];
  return new Response(JSON.stringify(emergencies), {
    headers: { "Content-Type": "application/json" },
  });
}
