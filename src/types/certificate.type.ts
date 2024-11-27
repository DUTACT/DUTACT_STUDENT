export type CertificateStatus = 'confirmed' | 'rejected' | 'pending'

export interface CertificateStatusOfEvent {
  type: CertificateStatus
  moderatedAt?: string
  reason?: string
}
