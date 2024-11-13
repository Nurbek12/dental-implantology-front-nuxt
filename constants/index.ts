import {
    LaToothSolid,
    HeOutlineDoctorMale,
    BsHospital,
    BsCalendar2Week,
    HeFilledDoctorMale,
    MaDoctor,
    GlStatusHealth,
    CaPhone,
    CaReportData,
    AnOutlinedMessage,
    PhTooth,
    TaReport,
    ReStarSmileLine,
    BxHomeAlt2,
    FlDataUsage,
    ReMoneyDollarCircleLine,
    LuUserCog,
    CoBrandTelegramPlane,
    AnFilledInstagram,
    LaFacebookF,
    AkYoutubeFill,
    LuUser,
    AkCalendar,
    LuCog,
    McInjectionLine,
} from '@kalimahapps/vue-icons'
import type { Specialty, ToothCondition, User } from '~/types'

export const admin_settings_links = [
    { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors', description: "Управление и просмотр информации о всех врачах в стоматологической клинике. Это включает добавление новых врачей, обновление существующих профилей врачей и удаление врачей из системы." },
    { title: 'Услуги', icon: MaDoctor, url: '/admin/services', description: "Управление списком услуг, предлагаемых стоматологической клиникой. В этом разделе можно добавлять новые услуги, обновлять информацию о существующих услугах и удалять услуги, которые больше не предлагаются." },
    { title: 'Процедуры', icon: McInjectionLine, url: '/admin/procedures', description: "Управление списком процедур, предлагаемых стоматологической клиникой. В этом разделе можно добавлять новые процедуры, обновлять информацию о существующих процедурах и удалять процедуры, которые больше не предлагаются." },
    { title: 'Первоначальные записи', icon: AnOutlinedMessage, url: '/admin/initial-records', description: "Управление первоначальными записями пациентов. Это включает добавление новых записей, обновление существующих записей и удаление записей, которые больше не актуальны." },
    { title: 'Зарплата', icon: ReMoneyDollarCircleLine, url: '/admin/salaries', description: "Управление информацией о зарплатах сотрудников клиники. В этом разделе можно просматривать и обновлять данные о зарплатах, а также управлять выплатами." },
    { title: 'Приходы/Расходы', icon: CaReportData, url: '/admin/reports', description: "Управление финансовыми отчетами, включая приходы и расходы клиники. В этом разделе можно просматривать и анализировать финансовые данные, а также создавать отчеты." },
    { title: 'Отчет', icon: TaReport, url: '/admin/report', description: "Создание и просмотр различных отчетов, связанных с работой клиники. Это включает отчеты о пациентах, услугах, финансах и других аспектах деятельности клиники." },
    { title: 'Профиль', icon: LuUserCog, url: '/admin/profile', description: 'Управление профилем пользователя и настройками аккаунта. В этом разделе вы можете обновить личную информацию, изменить пароль, настроить уведомления и управлять другими параметрами, связанными с вашим аккаунтом.' },
]

export const index_cards = [
    { icon: PhTooth, title: 'home.home-card-1-title', description: 'home.home-card-1-description' },
    { icon: MaDoctor, title: 'home.home-card-2-title', description: 'home.home-card-2-description' },
    { icon: ReStarSmileLine, title: 'home.home-card-3-title', description: 'home.home-card-3-description' },
]

export const index_statistics = [
    { icon: LaToothSolid, title: "home.home-counst-info-1", count: 5000 },
    { icon: BsHospital, title: "home.home-counst-info-2", count: 15 },
    { icon: HeOutlineDoctorMale, title: "home.home-counst-info-3", count: 70 },
    { icon: BsCalendar2Week, title: "home.home-counst-info-4", count: 40 },
]

export const admin_links = {
    "ADMIN": [
        { title: 'Пациенты', icon: LuUser, url: '/admin/patients' },
        { title: 'Записи на прием', icon: AkCalendar, url: '/admin/appointments' },
        { title: 'Настройки', icon: LuCog, url: '/admin/settings' },
    ],
    "DOCTOR": [
        { title: 'Пациенты', icon: LuUser, url: '/admin/patients' },
        { title: 'Записи на прием', icon: AkCalendar, url: '/admin/appointments' },
        { title: 'Профиль', icon: LuUserCog, url: '/admin/profile' },
        { title: 'Настройки', icon: LuCog, url: '/admin/settings' },
        
        // { title: 'Записи (для докторов)', icon: CdTable, url: '/admin/appointments-doctors' },
        // { title: 'Кошелек', icon: CoWallet, url: '/admin/wallet' },
        // { title: 'Профиль', icon: LuUserCog, url: '/admin/profile' },
    ]
}

export const languages = [
    { l: 'UZ',lang: 'uz', title: "O'zbek" },
    { l: 'РУ',lang: 'ru', title: 'Русский' },
    { l: 'EN',lang: 'en', title: "English" },
]

export const site_links = [
    { icon: BxHomeAlt2, title: 'nav.home', url: '#' },
    { icon: FlDataUsage, title: 'nav.about', url: '#about' },
    { icon: GlStatusHealth, title: 'nav.services', url: '#services' },
    { icon: MaDoctor, title: 'nav.doctors', url: '#doctors' },
    { icon: CaPhone, title: 'nav.contacts', url: '#contacts' },
]

export const social_links = [
    { icon: CoBrandTelegramPlane, link: 'https://t.me/drikramov' },
    { icon: AnFilledInstagram, link: 'https://www.instagram.com/drikramov.uz/' },
    { icon: LaFacebookF, link: 'https://www.facebook.com/people/DrIkramov/100067140900797/' },
    { icon: AkYoutubeFill, link: 'https://www.youtube.com/channel/UC4snULI68gU11HVJEA_316Q' },
]

export const getTimeDifferenceInMilliseconds = (date1: string, date2: string) => {
    const time1 = new Date(date1).toLocaleTimeString()
    const time2 = new Date(date2).toLocaleTimeString()
    // Split the time strings into hours and minutes
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Create Date objects with the same date but different times
    const d1: any = new Date();
    d1.setHours(hours1, minutes1, 0, 0);

    const d2: any = new Date();
    d2.setHours(hours2, minutes2, 0, 0);

    // Calculate the difference in milliseconds
    return Math.abs(d2 - d1);
}

export const timeToDecimal = (date: string) => {
    const time = new Date(date).toLocaleTimeString()

    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    return hours + minutes / 60;
}

export const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const getDateRange = (period: 0 | 1 | 2 | 3) => {
    const today = new Date();
    let startDate, endDate;

    switch (period) {
        case 0:
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

            if (today.getDate() <= 15) {
                startDate = new Date(firstDayOfMonth);
                endDate = new Date(firstDayOfMonth);
                endDate.setDate(15);
            } else {
                startDate = new Date(lastDayOfPreviousMonth);
                startDate.setDate(startDate.getDate() - 14);
                endDate = new Date(lastDayOfPreviousMonth);
            }
            break;

        case 1:
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;

        case 2:
            if (today.getMonth() < 6) {
                startDate = new Date(today.getFullYear() - 1, 6, 1);
                endDate = new Date(today.getFullYear() - 1, 11, 31);
            } else {
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date(today.getFullYear(), 5, 30);
            }
            break;

        case 3:
            startDate = new Date(today.getFullYear() - 1, 0, 1);
            endDate = new Date(today.getFullYear() - 1, 11, 31);
            break;

        default:
            throw new Error('Invalid period');
    }

    return {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
    }
}

export const getDates = (option: 0 | 1 | 2 | 3) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
    const day = today.getDate();

    // Форматирование дат в строку 'гггг-мм-дд'
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    switch (option) {
        case 0:
            if (day <= 15) {
                // Сегодня первая половина месяца
                const prevMonth = month === 1 ? 12 : month - 1;
                const prevYear = month === 1 ? year - 1 : year;
                const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
                const secondHalfStart = new Date(prevYear, prevMonth - 1, 16);
                const secondHalfEnd = new Date(prevYear, prevMonth - 1, daysInPrevMonth);
                return { start_date: formatDate(secondHalfStart), end_date: formatDate(secondHalfEnd) };
            } else {
                // Сегодня вторая половина месяца
                const firstHalfStart = new Date(year, month - 1, 1);
                const firstHalfEnd = new Date(year, month - 1, 15);
                return { start_date: formatDate(firstHalfStart), end_date: formatDate(firstHalfEnd) };
            }

        case 1:
            const prevMonthStart = new Date(year, month - 2, 1);
            const prevMonthEnd = new Date(year, month - 1, 0);
            return { start_date: formatDate(prevMonthStart), end_date: formatDate(prevMonthEnd) };

        case 2:
            if (month <= 6) {
                // Текущий месяц в 1-м полугодии
                const secondHalfYearStart = new Date(year - 1, 6, 1);
                const secondHalfYearEnd = new Date(year - 1, 11, 31);
                return { start_date: formatDate(secondHalfYearStart), end_date: formatDate(secondHalfYearEnd) };
            } else {
                // Текущий месяц во 2-м полугодии
                const firstHalfYearStart = new Date(year, 0, 1);
                const firstHalfYearEnd = new Date(year, 5, 30);
                return { start_date: formatDate(firstHalfYearStart), end_date: formatDate(firstHalfYearEnd) };
            }

        case 3:
            const prevYearStart = new Date(year - 1, 0, 1);
            const prevYearEnd = new Date(year - 1, 11, 31);
            return { start_date: formatDate(prevYearStart), end_date: formatDate(prevYearEnd) };
    }
}

export const pickNeededUserFields = (user: Partial<User>) => {
    return {
        role: user.role,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        content: user.content,
        lastName: user.lastName,
        birthDate: user.birthDate,
        firstName: user.firstName,
        middleName: user.middleName,
        experience: user.experience,
    }
}

export const specs: Record<Specialty, string> = {
    SURGEON: "Хирург",
    THERAPIST: "Терапевт",
    ORTHOPEDIST: "Ортопед",
    ORTHODONTIST: "Ортодонт",
    PERIODONTIST: "Пародонтолог",
    IMPLANTOLOGIST: "Имплантолог",
    DOCTORS_ASSISTANT: "Помощник Врача",
    PEDIATRIC_DENTIST: "Детский Стоматолог",
}

export const faqs = [
    {
        "question": {
            "uz": "Klinikaning qaysi xizmatlari taklif qilinadi?",
            "en": "What services does your clinic offer?",
            "ru": "Какие услуги предоставляет ваша клиника?"
        },
        "answer": {
            "uz": "Biz terapevtik stomatologiya, ortodontiya, jarrohlik stomatologiyasi, parodontologiya, estetik stomatologiya va bolalar stomatologiyasi kabi keng doiradagi stomatologik xizmatlarni taklif etamiz.",
            "en": "We offer a wide range of dental services, including therapeutic dentistry, orthodontics, surgical dentistry, periodontics, aesthetic dentistry, and pediatric dentistry.",
            "ru": "Мы предлагаем широкий спектр стоматологических услуг, включая терапевтическую стоматологию, ортодонтию, хирургическую стоматологию, пародонтологию, эстетическую стоматологию и детскую стоматологию."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday shifokorlar ishlaydi?",
            "en": "What kind of doctors work at the clinic?",
            "ru": "Какие врачи работают в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda tajribali terapevtlar, ortodontlar, jarrohlar, parodontologlar va bolalar stomatologlari ishlaydi.",
            "en": "Our clinic employs experienced therapists, orthodontists, surgeons, periodontists, and pediatric dentists.",
            "ru": "В нашей клинике работают опытные терапевты, ортодонты, хирурги, пародонтологи и детские стоматологи."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday jihozlar mavjud?",
            "en": "What kind of equipment does the clinic have?",
            "ru": "Какое оборудование есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda zamonaviy diagnostika va davolash uskunalari mavjud. Biz har doim yangi texnologiyalarni qo'llab-quvvatlaymiz.",
            "en": "Our clinic is equipped with modern diagnostic and treatment equipment. We always support the latest technologies.",
            "ru": "Наша клиника оснащена современным диагностическим и лечебным оборудованием. Мы всегда поддерживаем новейшие технологии."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday sharoitlar mavjud?",
            "en": "What kind of facilities does the clinic have?",
            "ru": "Какие условия есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda qulay va zamonaviy sharoitlar mavjud. Biz bemorlarning qulayligini ta'minlaymiz.",
            "en": "Our clinic offers comfortable and modern facilities. We ensure the comfort of our patients.",
            "ru": "Наша клиника предлагает комфортные и современные условия. Мы обеспечиваем комфорт наших пациентов."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday qabul tizimi mavjud?",
            "en": "What kind of appointment system does the clinic have?",
            "ru": "Какая система записи на прием есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda onlayn va telefon orqali qabul tizimi mavjud. Bemorlar osonlikcha qabulga yozilishlari mumkin.",
            "en": "Our clinic offers an online and telephone appointment system. Patients can easily schedule their appointments.",
            "ru": "Наша клиника предлагает систему записи на прием онлайн и по телефону. Пациенты могут легко записаться на прием."
        }
    }
]

export const slider_images = [
    '/images/DSCF1082_8_11zon_8_11zon.webp',
    '/images/DSCF0192_11zon.webp',
    '/images/DSCF1007_4_11zon_4_11zon_11zon.webp',
    '/images/DSCF1055_6_11zon_6_11zon.webp',
    '/images/DSCF1074_7_11zon_7_11zon.webp',
    '/images/DSCF1099_11_11zon_11_11zon.webp'
]

export const services = [
    {
        icon: '/services/service1.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Удаление зубов',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Удаляем зубы под анастезией - врач подбирает анестетик для каждого пациента и конкретной процедуры.',
        }
    },
    {
        icon: '/services/service2.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Лечение пульпида',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Проводим комплексную диагностику и только после этого приступаем к лечению беспокоящего вас зуба.',
        }
    },
    {
        icon: '/services/service3.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Лечение кариеса',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Определим проблему, составим гравик визитов для лечения, а так же подберем правильный домашний уход.',
        }
    },
    {
        icon: '/services/service4.svg',
        title: {
            uz: '',
            en: '',
            ru: 'УЗ чистка зубов',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Профессиональная гигиена УЗ-скалером позволяет быстро и безопасно удалить застарелый зубной камень.',
        }
    },
    {
        icon: '/services/service5.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Протезирование',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Команда врачей анализируют ваш случай и подбирает оптимальный для вас вариант по срокам и стоимости.',
        }
    },
    {
        icon: '/services/service6.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Имплантация зубов',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Наши специалисты и безболезненно устанавливают протезы, которые подходят в вашем случае.',
        }
    },
    {
        icon: '/services/service7.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Лечение пародонтоза',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Стоматолог удалит налет и зубной камень, а так же индивидуальные рекомендации по домашнему уходу.',
        }
    },
    {
        icon: '/services/service8.svg',
        title: {
            uz: '',
            en: '',
            ru: 'Брекет системы',
        },
        description: {
            uz: '',
            en: '',
            ru: 'Предотвратим заболевания, которые возникают из за неправильного положения зубов.',
        }
    }
]

export const patient_links = [
    { url: 'appointments', title: 'Записи' },
    { url: 'initial-examinations', title: 'Лечение' },
    { url: 'xray', title: 'Рентген' },
    { url: 'payments', title: 'Оплаты' },
]

export const therapy_map = [
    { value: "ROOT", code: "R", title: "Корень" },
    { value: "CARIES", code: "C", title: "Кариес" },
    { value: "CROWN", code: "K", title: "Коронка" },
    { value: "FILLING", code: "Pl", title: "Пломба" },
    { value: "IMPLANT", code: "I", title: "Имплант" },
    { value: "PULPITIS", code: "P", title: "Пульпит" },
    { value: "MOBILITY", code: "П", title: "Подвижность" },
    { value: "REMOVED", code: "O", title: "Зуб отсутствует" },
    { value: "DEPOSITS", code: "H", title: "Зубные отложения" },
    { value: "DEPULPED", code: "Д", title: "Депульпированный" },
    { value: "PERIODONTITIS", code: "Pt", title: "Периодонтит" },
    { value: "ARTIFICIAL", code: "A", title: "Искусственный зуб" },
]

export const tooth_conditions: Record<ToothCondition, string> = {
    ROOT: "Корень",
    CROWN: "Коронка",
    CARIES: "Кариес",
    IMPLANT: "Имплант",
    FILLING: "Пломба",
    REMOVED: "Зуб отсутствует",
    PULPITIS: "Пульпит",
    MOBILITY: "Подвижность",
    DEPOSITS: "Зубные отложения",
    DEPULPED: "Депульпированный",
    PERIODONTITIS: "Периодонтит",
    ARTIFICIAL: "Искусственный зуб",
}

export const tooth_nums = [
    [18,17,16,15,14,13,12,11],
    [21,22,23,24,25,26,27,28],
    [48,47,46,45,44,43,42,41],
    [31,32,33,34,35,36,37,38],
]

export const toothHealthCondition = ["CARIES", "FILLING", "DEPULPED", "PULPITIS", "PERIODONTITIS", "CROWN", "ARTIFICIAL", "ROOT", "MOBILITY", "DEPOSITS"]

export const payment_types = {
    "CASH": "Наличные",
    "CARD": "Карта",
    "TRANSFER": "Передача",
    "CREDIT": "Кредит"
}

export const WORKING_HOURS = [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "Обед",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
]