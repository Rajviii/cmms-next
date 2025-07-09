import { workOrders } from './data';

function sortData(data, sortKey, order = 'asc') {
  return data.sort((a, b) => {
    const valA = String(a[sortKey] || '').toLowerCase();
    const valB = String(b[sortKey] || '').toLowerCase();

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || '';
  const sortKey = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const filters = {
    status: searchParams.get('status'),
    priority: searchParams.get('priority'),
    division: searchParams.get('division'),
  };

  let filtered = workOrders.filter((wo) => {
    const matchesSearch = Object.values(wo).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(wo[key]).toLowerCase() === value.toLowerCase();
    });

    return matchesSearch && matchesFilters;
  });

  if (sortKey) {
    filtered = sortData(filtered, sortKey, order);
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    data: paginated,
    total,
  });
}
