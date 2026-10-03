import { createContext, useContext, useState } from 'react'

const EnrollmentContext = createContext(null)

// Garde les données saisies d'une étape à l'autre
export function EnrollmentProvider({ children }) {
  const [data, setData] = useState({})
  const update = (step, values) => setData((d) => ({ ...d, [step]: { ...d[step], ...values } }))
  return <EnrollmentContext.Provider value={{ data, update }}>{children}</EnrollmentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnrollment() {
  return useContext(EnrollmentContext)
}
