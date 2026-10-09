import { api } from './api'

function getTrackingNumber(application) {
  if (!application?.trackingNumber) {
    throw new Error('Le numéro du dossier est introuvable. Reprenez le parcours depuis l’étape Identité.')
  }
  return encodeURIComponent(application.trackingNumber)
}

function toApiIdentity(values) {
  const [year, month, day] = values.dateNaissance.split('-')
  return {
    lastName: values.nom.trim(),
    firstName: values.prenoms.trim(),
    birthDate: `${day}/${month}/${year}`,
    birthPlace: values.lieuNaissance.trim(),
    gender: values.sexe,
    nationality: values.nationalite,
    nationalIdNumber: values.numeroCni.trim(),
  }
}

export async function saveApplicationStep({ step, values, savedValues, application, token }) {
  if (!token) throw new Error('Votre session a expiré. Reconnectez-vous puis réessayez.')

  if (step === 'identite') {
    if (application?.trackingNumber) {
      if (!savedValues) {
        throw new Error('Les informations déjà enregistrées sont introuvables dans cette session.')
      }
      const unchanged = JSON.stringify(toApiIdentity(values)) === JSON.stringify(toApiIdentity(savedValues))
      if (unchanged) return application
      throw new Error("L’API ne propose pas de route pour modifier l’identité d’un dossier déjà créé.")
    }

    const response = await api('/applications', {
      method: 'POST',
      token,
      body: toApiIdentity(values),
    })
    const created = response.data
    if (!created?.tracking_number) {
      throw new Error("L’API n’a pas renvoyé le numéro du dossier créé.")
    }
    return { trackingNumber: created.tracking_number, status: created.status }
  }

  const trackingNumber = getTrackingNumber(application)
  const routes = {
    famille: {
      path: 'family',
      body: (formValues) => ({
        fatherFullName: String(formValues.nomPere ?? '').trim(),
        motherFullName: String(formValues.nomMere ?? '').trim(),
      }),
    },
    adresse: {
      path: 'address',
      body: (formValues) => ({
        residenceAddress: String(formValues.rue ?? '').trim(),
        city: String(formValues.ville ?? '').trim(),
        country: String(formValues.pays ?? '').trim(),
        phoneNumber: String(formValues.telephone ?? '').trim(),
        email: String(formValues.email ?? '').trim(),
      }),
    },
    profession: {
      path: 'profession',
      body: (formValues) => ({
        profession: String(formValues.profession ?? '').trim(),
        employer: String(formValues.employeur ?? '').trim(),
      }),
    },
  }
  const route = routes[step]
  if (!route) throw new Error(`Étape de formulaire inconnue : ${step}`)

  const response = await api(`/applications/${trackingNumber}/${route.path}`, {
    method: 'PATCH',
    token,
    body: route.body(values),
  })
  return response.data
}

const DOCUMENT_FIELDS = {
  acteNaissance: 'birthCertificateUrl',
  cni: 'nationalIdCardUrl',
  justificatifDomicile: 'proofOfAddressUrl',
  photo: 'idPhotoUrl',
}

export async function saveApplicationDocuments({ documents, application, token }) {
  if (!token) throw new Error('Votre session a expiré. Reconnectez-vous puis réessayez.')

  const formData = new FormData()
  for (const [key, field] of Object.entries(DOCUMENT_FIELDS)) {
    const document = documents[key]
    if (!document?.file) {
      throw new Error('Les quatre documents obligatoires doivent être sélectionnés.')
    }
    formData.append(field, document.file, document.file.name)
  }

  const response = await api(`/applications/${getTrackingNumber(application)}/documents`, {
    method: 'PATCH',
    token,
    body: formData,
  })
  return response.data
}
