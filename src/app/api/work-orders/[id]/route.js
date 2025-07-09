import { workOrders } from '../data';

export async function GET(_, { params }) {
  const order = workOrders.find(wo => wo.id === params.id);
  if (!order) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(order);
}

export async function PUT(req, { params }) {
  const index = workOrders.findIndex(wo => wo.id === params.id);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  workOrders[index] = { ...workOrders[index], ...body };
  return Response.json(workOrders[index]);
}

export async function DELETE(_, { params }) {
  const index = workOrders.findIndex(wo => wo.id === params.id);
  if (index === -1) return Response.json({ error: 'Not found' }, { status: 404 });

  const deleted = workOrders.splice(index, 1)[0];
  return Response.json({ message: 'Deleted', deleted });
}
