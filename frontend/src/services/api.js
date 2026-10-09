const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function api(path, { method = 'GET', body, token } = {}) {
  const isFormData = body instanceof FormData
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || data.msg || `Erreur API (${res.status}).`)
  return data
}
