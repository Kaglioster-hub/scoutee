import data from '@/data/scoutee_master.json'; export async function GET(){ return Response.json(data.services); }
