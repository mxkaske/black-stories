// REMINDER: not needed currently, only if using CSR and useSWR

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export async function updateRequest(url: string, { arg }: { arg: unknown }) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}

export async function deleteRequest(url: string) {
  return fetch(url, {
    method: "DELETE",
  });
}
