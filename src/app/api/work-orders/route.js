import { workOrders } from './data';

export async function GET() {
  return Response.json(workOrders);
}

export async function POST(req) {
  const body = await req.json();
  const newWO = { id: `WO-${workOrders.length + 1}`.padStart(6, '0'), ...body };
  workOrders.push(newWO);
  return Response.json(newWO, { status: 201 });
}