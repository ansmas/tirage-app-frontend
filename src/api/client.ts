const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("API ERROR", response.status, text);
    throw new Error(`API error ${response.status}`);
  }

  return response.json();
}

export function apiGet<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  return request<T>(path, options);
}

export function apiPost<T>(
  path: string,
  body?: unknown,
  options?: RequestInit
): Promise<T> {
  return request<T>(path, {
    method: "POST",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
    ...options,
  });
}
