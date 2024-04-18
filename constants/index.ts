import {
    FlClipboardTextLtr,
    LaToothSolid,
    HeOutlineDoctorMale,
    BsHospital,
    BsCalendar2Week,
    AkDashboard,
    HuGift,
    GlBullhorn,
    BsJournalText,
    AkChatDots,
    HeFilledDoctorMale,
    MaDoctor,
    GlStatusHealth,
    GlWork,
    AkImage,
    MdOutlinedBiotech,
    MiArticle,
    AkChatQuestion,
} from '@kalimahapps/vue-icons'

export const index_cards = [
    { icon: FlClipboardTextLtr, title: "Далеко-далеко, за словесными.", description: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты." },
    { icon: FlClipboardTextLtr, title: "Далеко-далеко, за словесными.", description: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты." },
    { icon: FlClipboardTextLtr, title: "Далеко-далеко, за словесными.", description: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты." },
]

export const index_statistics = [
    { icon: LaToothSolid, title: "Happy Clients", count: 1200 },
    { icon: BsHospital, title: "Year Experience", count: 15 },
    { icon: HeOutlineDoctorMale, title: "Doctor & Staff", count: 70 },
    { icon: BsCalendar2Week, title: "Online Appointment", count: 40 },
]

export const admin_links = {
    "ADMIN": [
        { title: 'Главная', icon: AkDashboard, url: '/admin' },
        { title: 'Акции', icon: HuGift, url: '/admin/stocks' },
        { title: 'Новости', icon: GlBullhorn, url: '/admin/news' },
        // { title: 'Записи на прием', icon: BsJournalText, url: '/admin/appointments' },
        // { title: 'Отзывы', icon: AkChatDots, url: '/admin/reviews' },
        // { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors' },
        // { title: 'Специализации', icon: MaDoctor, url: '/admin/specialities' },
        // { title: 'Услуги', icon: GlStatusHealth, url: '/admin/services' },
        // { title: 'Категория Услугов', icon: GlWork, url: '/admin/service-categories' },
        // { title: 'Статьи', icon: MiArticle, url: '/admin/articles' },
        // { title: 'Вопросы', icon: AkChatQuestion, url: '/admin/faqs' },
    ],
    "USER": {},
    "DOCTOR": {}
}

export const languages = [
    { lang: 'uz', title: "O'zbek" },
    { lang: 'ru', title: 'Русский' },
    { lang: 'en', title: "English" },
]