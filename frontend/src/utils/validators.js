// Règle BR13 : JPG/PNG/PDF, 5 Mo maximum
export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

export function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Format accepté : PDF, JPG ou PNG.'
  if (file.size > MAX_FILE_SIZE) return 'Le fichier dépasse 5 Mo.'
  return null
}

// Référence unique (format proposé, à valider : Q1) : PC-2026-000458
export const REFERENCE_PATTERN = /^PC-\d{4}-\d{6}$/
