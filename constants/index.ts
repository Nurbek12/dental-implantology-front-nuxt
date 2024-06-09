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
    HeOutlineMedicalRecords,
    MiArticle,
    CaDataTable,
    FaUserInjured,
    CaReportData,
    AnOutlinedComment,
    PhTooth,
    ReStarSmileLine,
} from '@kalimahapps/vue-icons'

export const index_cards = [
    { icon: PhTooth, title: 'Профилактическое обследование', description: 'Регулярные профилактические осмотры помогают поддерживать здоровье ваших зубов и десен, а также предотвращать развитие серьезных заболеваний' },
    { icon: MaDoctor, title: 'Имплантация', description: 'Восстановите свою уверенность с помощью имплантатов - прочного и надежного решения для замены отсутствующих зубов.' },
    { icon: ReStarSmileLine, title: 'Эстетическая стоматология', description: 'Улучшите внешний вид вашей улыбки с помощью наших услуг по эстетической стоматологии, включая отбеливание зубов, люминейры и коррекцию формы зубов.' },
]

export const index_statistics = [
    { icon: LaToothSolid, title: "Счастливые клиенты", count: 1200 },
    { icon: BsHospital, title: "Год опыта", count: 15 },
    { icon: HeOutlineDoctorMale, title: "Врачи", count: 70 },
    { icon: BsCalendar2Week, title: "Онлайн запись", count: 40 },
]

export const index_about_items = [
    'Квалифицированные специалисты и постоянное совершенствование',
    '20 лет опыта в стоматологии',
    'Современное оборудование, индивидуальный подход, гибкое расписание',
    'Доверие и превосходство',
]

export const index_blogs = [
    { title: 'Советы по уходу за зубами', description: 'Чистка зубов два раза в день и регулярное использование зубной нити — это лишь начало. В нашем блоге вы найдете профессиональные советы по уходу за полостью рта, которые помогут сохранить вашу улыбку здоровой и красивой на долгие годы.', image: 'https://img.freepik.com/free-photo/smiling-young-male-dentist-holding-toothbrush_171337-15748.jpg?t=st=1717832995~exp=1717836595~hmac=4b96b353a94dcf4aa121028b0f4c3312240347ac3f964c2d80adb00b2891d1aa&w=900' },
    { title: 'Современные технологии', description: 'Мир стоматологии постоянно развивается, и мы стремимся использовать самые передовые технологии для лечения наших пациентов. Узнайте больше о новейших достижениях и инновациях в стоматологической сфере, которые делают лечение более эффективным и комфортным.', image: 'https://img.freepik.com/free-photo/close-up-hand-wearing-protective-glove_23-2149164346.jpg?t=st=1717833060~exp=1717836660~hmac=c41feb23efc1a71ef318331a879253660fad1a73b6d2e3fa8ff80ae39cf554e1&w=900' },
    { title: 'Часто задаваемые вопросы', description: 'Почему нужно удалять зубы мудрости? Что такое имплантация зубов и как она проходит? В этом разделе мы отвечаем на самые популярные вопросы наших пациентов, чтобы вы могли чувствовать себя уверенно и информированно перед визитом к стоматологу.', image: 'https://img.freepik.com/premium-photo/person-holding-pair-scissors-with-question-marks-it_646443-2521.jpg?w=900' },
]

export const admin_links = {
    "ADMIN": [
        { title: 'Главная', icon: AkDashboard, url: '/admin' },
        { title: 'Записи на прием', icon: CaDataTable, url: '/admin/appointments' },
        { title: 'Специализации', icon: MaDoctor, url: '/admin/specialities' },
        { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors' },
        { title: 'Пациенты', icon: FaUserInjured, url: '/admin/patients' },
        { title: 'Услуги', icon: GlWork, url: '/admin/services' },
        { title: 'Отзывы', icon: AnOutlinedComment, url: '/admin/reviews' },
        { title: 'Первоначальные записи', icon: HeOutlineMedicalRecords, url: '/admin/initial-records' },
        { title: 'Записи на прием', icon: CaDataTable, url: '/admin/appointments-doctors' },
        { title: 'Первоначальные записи', icon: CaReportData, url: '/admin/reports' },
    ],
    "USER": {},
    "DOCTOR": {}
}

export const languages = [
    { lang: 'uz', title: "O'zbek" },
    { lang: 'ru', title: 'Русский' },
    { lang: 'en', title: "English" },
]

export const site_links = [
    { title: 'Главная', url: '/' },
    { title: 'О нас', url: '/about' },
    { title: 'Докторы', url: '/doctors' },
    { title: 'Услуги', url: '/services' },
    { title: 'Отзывы', url: '/reviews' },
    { title: 'Контакты', url: '/contact' },
]


export const formatDate = (dateString: string, prefix1: ', ' | 'T' = ', ', prefix2: '-' | '.' = '.') => {
    let year, month, day

    const [date, time] = dateString.split(prefix1);
    const [hours, minutes] = time.split(":")
    const dateSplit = date.split(prefix2)
    
    if(prefix2 === '.')
        [year, month, day] = [dateSplit[2], dateSplit[1], dateSplit[0]]
    else
        [year, month, day] = [dateSplit[0], dateSplit[1], dateSplit[2]]
    

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const formatDateJson = (dateString: string) => {
    const [date, time] = dateString.split("T");
    const [day, month, year] = date.split("-");
    const [hours, minutes] = time.split(":");

    return {
        day: +day,
        month: +month,
        year: +year,
        hours: +hours,
        minutes: +minutes
    }
}