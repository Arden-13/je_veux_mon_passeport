const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function api(path, { method = 'GET', body, token } = {}) {
  const isFormData = body instanceof FormData

  const headers = {
    ...(body != null && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body:
      body == null
        ? undefined
        : isFormData
          ? body
          : JSON.stringify(body),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || data?.error || data?.msg || 'Une erreur est survenue.')
  }

  return data
}