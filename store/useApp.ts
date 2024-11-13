import type { Patient } from '@/types'

export const patient = useState<Patient|null>('patient', () => null)