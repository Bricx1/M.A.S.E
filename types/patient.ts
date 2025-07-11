export interface Patient {
  id?: string
  name: string
  phone: string
  address: string
  dateOfBirth: string
  emergencyContact?: string
  emergencyPhone?: string
  firstVisitScheduled?: string
  assignedNurse?: string
  services?: string[]
  priority?: string
  insuranceProvider?: string
  insuranceId?: string
  primaryDiagnosis?: string
  status?: string
  acceptedDate?: string
  insuranceVerified?: boolean
  onboardingCompletedBy?: string
  onboardingCompletedAt?: string
  sessionNotes?: string
  portalActivated?: boolean
  careServicesEnabled?: boolean
}
