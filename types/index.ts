type UserRole = "ADMIN" | "DOCTOR";

export type Specialty = "THERAPIST" | "ORTHOPEDIST" | "ORTHODONTIST" | "SURGEON" | "IMPLANTOLOGIST" | "PERIODONTIST" | "PEDIATRIC_DENTIST" | "DOCTORS_ASSISTANT";

type Gender = "MALE" | "FEMALE";

type XRayType = "INTRAORAL" | "ORTHOPANTOMOGRAM" | "CT" | "UPPER_LOWER_JAW_CT" | "UPPER_LOWER_JAW_AND_TMJ_JOINTS_CT" | "UPPER_JAW_AND_MAXILLARY_SINUSES_CT" | "LATERAL_PROJECTION_TRG" | "DIRECT_PROJECTION_TRG" | "SMV_PROJECTION_TRG" | "FOUR_SECTION_TMJ" | "SIX_SECTION_TMJ" | "OTHER";

type BiteType = "ORTHOGNATHIC" | "PROGNATHIC" | "DIRECT" | "BIPROGNATHIC" | "DEEP" | "OPEN" | "CROSS" | "DISTAL";

export type ToothCondition = "CARIES" | "FILLING" | "DEPULPED" | "PULPITIS" | "PERIODONTITIS" | "CROWN" | "ARTIFICIAL" | "IMPLANT" | "ROOT" | "MOBILITY" | "DEPOSITS" | "REMOVED";

export type PaymentType = "CASH" | "CARD" | "TRANSFER" | "CREDIT";

export type AlertMessageStatuses = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR'

export type AlertMessage = {
  id: number
  message: string
  type: AlertMessageStatuses
}

export type ToothConditionLocale = {
  id?: number
  isEdit?: boolean
  toothNum: number
  toothCondition: ToothCondition[]
}

export interface IUser {
  userId: number
  userRole: string | UserRole
}

export interface User {
  id: number;
  phone: string;
  password: string;
  refreshToken?: string | null;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatar?: string | null;
  email?: string | null;
  address?: string | null;
  birthDate: string;
  balance: number;
  specialties: Specialty[];
  experience?: number | null;
  content?: string | null;
  rating: number;
  isPublished: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  appointments: Appointment[];
  patients: Patient[];
  examinations: Examination[];
}

export interface Service {
  id: number;
  title: string;
  description?: string | null;
  isPublic: boolean;
  procedures: Procedure[];
}

export interface Procedure {
  id: number;
  code?: string | null;
  title_en: string;
  title_ru?: string | null;
  title_uz?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  description_uz?: string | null;
  serviceId: number;
  service: Service;
  price: number;
  kpi: number;
  appointments: Appointment[];
  treatments: Treatment[];
}

export interface InitialRecord {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  phone: string;
  additionalPhone?: string | null;
  avatar?: string | null;
  email?: string | null;
  birthDate: string;
  gender: Gender;
  age: number;
  address?: string | null;
  balance: number;
  additionalInformation?: any | null;
  userId: number;
  createdUser: User;
  createdAt: string;
  updatedAt: string;
  appointments: Appointment[];
  teeth: Tooth[];
  initialExamination?: InitialExamination | null;
}

export interface Appointment {
  id: number;
  patientId: number;
  patient: Patient;
  doctorId: number;
  doctor: User;
  procedureId: number;
  procedure: Procedure;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tooth {
  id: number;
  num: number;
  condition: ToothCondition[];
  patientId: number;
  patient: Patient;
  images: string[];
  xRayData: XRayData[];
  examinations: Examination[];
}

export interface XRayData {
  id: number;
  examinationDate: string;
  type: XRayType;
  toothId: number;
  tooth: Tooth;
  amount: number;
  dose: number;
  conclusion?: string | null;
  images: string[];
}

export interface InitialExamination {
  id: number;
  patientId: number;
  patient: Patient;
  toothExaminations: Examination[];
  biteType?: BiteType | null;
  indexGreenVermillion: number;
  indexFedorovVolodkin: number;
  objectiveExamData?: string | null;
  oralMucosaCondition?: string | null;
  xRayLabaratoryData?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Examination {
  id: number;
  toothId: number;
  tooth: Tooth;
  toothCondition: ToothCondition[];
  userId: number;
  createdUser: User;
  isPaid?: boolean | null;
  isInitial: boolean;
  initialExaminatinId?: number | null;
  initialExamination?: InitialExamination | null;
  treatments: Treatment[];
  createdAt: string;
  updatedAt: string;
  payments: Payment[];
}

export interface Treatment {
  id: number;
  procedureId: number;
  procedure: Procedure;
  examinationId: number;
  examination: Examination;
  isCompleted: boolean;
  completedAt?: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: number;
  examinationId: number;
  examination: Examination;
  amount: number;
  type: PaymentType;
  createdAt: string;
  updatedAt: string;
}