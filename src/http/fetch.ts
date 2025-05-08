export const fetchAllData = async () => {
  const request = await fetch('/api/transactions', {
    method: 'GET',
  });

  const response = await request.json();
  return response;
};

export const deleteTransaction = async (id: string) => {
  const request = await fetch(`/api/transactions/${id}`, {
    method: 'DELETE',
  });

  const response = await request.json();
  return response;
};

export const postTransaction = async (body: {
  value: number;
  type: string;
  isIncome: boolean;
  description?: string;
}) => {
  const req = await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await req.json();
};

export const putTransaction = async (body: {
  value: number;
  type: string;
  isIncome: boolean;
  description?: string;
  id: string;
  createdAt: Date | string;
}) => {
  const req = await fetch(`/api/transactions/${body.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await req.json();
};
