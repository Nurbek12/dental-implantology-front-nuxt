export interface IUser {}

export interface IDoctor {
    id?: number
    last_login?: null | string
    username?: string
    first_name: string
    last_name: string
    date_joined?: string
    password?: string
    avatar?: string | null
    phone: string
    middle_name: string
    birth_date: string
    created_at?: string
    updated_at?: string
    user_type: "DOCTOR"
    licences: string
    experience: number
    experiences: string
    balance?: number
    educations: string
    certificates: string
    content?: string
    rating?: number
    appointments?: IAppointment[]
    is_published: boolean
}

export interface IPatient {
    id?: number
    last_login?: null | string
    username?: string
    first_name: string
    last_name: string
    date_joined?: string
    avatar?: string | null
    address?: string | null
    phone: string
    middle_name: string
    birth_date: string
    created_at?: string
    updated_at?: string
    user_type?: "SUPERUSER" | "DOCTOR"
}

export interface IAdmin extends IPatient {
    
}

export interface IUser extends IPatient {
    
}

export interface ISpecialtie {
    id: number
    name_en: string
    name_ru: string
    name_uz: string
    image: string
    is_published: boolean
    created_at: string
    updated_at: string
    doctor: number
}

export interface IServiceCategory {
    id: number
    name_en: string
    name_ru: string
    name_uz: string
    image: string
    is_published: boolean
    created_at: string
    updated_at: string
}

export interface IService {
    id?: number
    image?: string
    slug: string
    name_en: string
    name_ru: string
    name_uz: string
    description_en: string
    description_ru: string
    description_uz: string
    price_start: number
    price_end: number
    content: string
    kpi_percent: number
    is_published: boolean
    created_at?: string
    updated_at?: string
    category?: string | null
}

export interface IInitialRecord {
    id?: number,
    first_name: string,
    last_name: string,
    phone: string,
    comment: string,
    is_active: boolean
    created_at?: string
}

export interface IRatings {
    id?: number
    first_name: string
    last_name: string
    rate: number
    review: string
    created_at?: string
    updated_at?: string
    doctor?: null | IDoctor | number
}

export interface IAppointment {
    id?: number
    doctor: IUser | number | null
    patient: IUser | number | null
    service: IService | number | null
    price: number
    status: "PN" | "FP" | "PP" | "UP" | "CD"
    date: string
    start_time: string
    end_time: string
    profits?: {
        id: number,
        amount: number,
        created_at: string,
        updated_at: string,
        report: number,
        appointment: number
    }[]
    created_at?: string
    updated_at?: string
}

export interface IReport {
    id?: number,
    profits: {
        id: number,
        amount: number,
        created_at: string,
        updated_at: string,
        report: number,
        appointment: number
    }[],
    consumptions: {
        id: number,
        title: string,
        description: string,
        amount: number,
        created_at: string,
        updated_at: string,
        report: number
    }[],
    date: string,
    total_profit: number,
    total_consumption: number,
    net_profit: number,
}

export interface ISalary {
    id?: number
    amount: number
    comment?: string
    date?: string
    title?: string
    description?: string
    doctor: null | number | IDoctor
    created_at?: string
    updated_at?: string
}




export interface Stock {
    id?: number
    name?: string
    name_ru: string
    name_uz?: string

    image?: string
    thumb?: string
    slug?: string
    
    description_ru: string
    description_uz: string
  
    content: string
    discount: number
  
    start_date: string
    end_date: string
  
    created_at?: string
    updated_at?: string
}

export interface Article {
    id?: number
    
    slug?: string
    author: string
    title: string
    description: string
    image?: string
    thumb?: string
    content: string
    images: string[]
    publish: boolean
  
    created_at?: string
    updated_at?: string
}
  
export interface Specialty {
    id?: number
    name?: string
    image?: string
    thumb?: string

    name_ru: string
    name_uz: string
  
    // doctors_id?: string[]
    doctors?: Doctor[]
  
    created_at?: string
    updated_at?: string
}
  
export interface Doctor {
    id?: number
    name?: string
    image?: string
    thumb?: string
    
    speciality?: Specialty[]
    reviews?: Review[]

    licences: string[]
    experience: number | ''
    experiences: string[]
    educations: string[]
    certificates: string[]
    speciality_id: number[]
    content: string

    rating: number

    phone?: string
    tg: string
    inst: string
    fb: string
    in: string
    publish: boolean
    laboratory: boolean

    _count?: {
        reviews?: number
    }
  
    appointments?: Appointment[]
  
    created_at?: string
    updated_at?: string
}
  
export interface Service_Category {
    id?: number
    name?: string
    name_ru: string
    name_uz: string
    image?: string
    thumb?: string
    
    is_published?: boolean
  
    services?: Service[]
  
    created_at?: string
    updated_at?: string
}
  
export interface Service {
    id?: number
    
    slug?: string
    image?: string
    thumb?: string
    name_ru: string
    name_uz: string
  
    description_ru: string
    description_uz: string

    category_id?: number | null
    category?: Service_Category

    content?: string
  
    price: number
    publish: boolean
  
    created_at?: string
    updated_at?: string
}
  
export interface FAQs {
    id?: number
    
    title_ru?: string
    title_uz?: string
    content_ru?: string
    content_uz?: string
    publish: boolean
  
    created_at?: string
    updated_at?: string
}
  
export interface Appointment {
    id?: number
  
    name: string
    phone: string
    doctorid?: string
    doctor?: Doctor
    
    check: boolean
    
    created_at?: string
    updated_at?: string
}
  
export interface Review {
    id?: number
  
    firstname: string
    lastname?: string
    message: string
    publish?: boolean
    rate: number

    doctor_id?: number
    doctor?: Doctor
    
    created_at?: string
    updated_at?: string
}
  
export interface Admin {
    id?: number
    
    login: string
    password: string
  
    created_at?: string
    updated_at?: string
}

export interface News {
    id?: number

    slug?: string
    title: string
    description: string
    image?: string
    thumb?: string
    date: string
    publish: boolean
  
    content: string

    created_at?: string
    updated_at?: string
}

export interface Equipment {
    id?: number
  
    images: string[]
    title: string
    description: string
    publish: boolean

    created_at?: string
    updated_at?: string
}

export interface Gallery {
    id?: number
    title: string
    type?: string
    cover: string
    images: string[]
    thumb?: string
    video?: string
    publish: boolean
  
    created_at?: string
    updated_at?: string
}
  
export interface Laboratory {
    id?: number
    name?: string
    image?: string
    thumb?: string

    experience: string
    education: string
  
    content?: String
  
    rating?: number
  
    phone?: string
    tg: string
    inst: string
    fb: string
    in: String
    publish: boolean
  
    created_at?: string
    updated_at?: string
}