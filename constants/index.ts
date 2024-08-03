import {
    LaToothSolid,
    HeOutlineDoctorMale,
    BsHospital,
    BsCalendar2Week,
    HeFilledDoctorMale,
    MaDoctor,
    GlWork,
    CgList,
    GlStatusHealth,
    CaPhone,
    CaDataTable,
    FaUserInjured,
    CaReportData,
    AnOutlinedMessage,
    PhTooth,
    TaReport,
    ReStarSmileLine,
    BxHomeAlt2,
    FlDataUsage,
    ReMoneyDollarCircleLine,
} from '@kalimahapps/vue-icons'

export const index_cards = [
    { icon: PhTooth, title: 'home.home-card-1-title', description: 'home.home-card-1-description' },
    { icon: MaDoctor, title: 'home.home-card-2-title', description: 'home.home-card-2-description' },
    { icon: ReStarSmileLine, title: 'home.home-card-3-title', description: 'home.home-card-3-description' },
]

export const index_statistics = [
    { icon: LaToothSolid, title: "home.home-counst-info-1", count: 1200 },
    { icon: BsHospital, title: "home.home-counst-info-2", count: 15 },
    { icon: HeOutlineDoctorMale, title: "home.home-counst-info-3", count: 70 },
    { icon: BsCalendar2Week, title: "home.home-counst-info-4", count: 40 },
]

export const index_blogs = [
    { title: 'Советы по уходу за зубами', description: 'Чистка зубов два раза в день и регулярное использование зубной нити — это лишь начало. В нашем блоге вы найдете профессиональные советы по уходу за полостью рта, которые помогут сохранить вашу улыбку здоровой и красивой на долгие годы.', image: 'https://img.freepik.com/free-photo/smiling-young-male-dentist-holding-toothbrush_171337-15748.jpg?t=st=1717832995~exp=1717836595~hmac=4b96b353a94dcf4aa121028b0f4c3312240347ac3f964c2d80adb00b2891d1aa&w=900' },
    { title: 'Современные технологии', description: 'Мир стоматологии постоянно развивается, и мы стремимся использовать самые передовые технологии для лечения наших пациентов. Узнайте больше о новейших достижениях и инновациях в стоматологической сфере, которые делают лечение более эффективным и комфортным.', image: 'https://img.freepik.com/free-photo/close-up-hand-wearing-protective-glove_23-2149164346.jpg?t=st=1717833060~exp=1717836660~hmac=c41feb23efc1a71ef318331a879253660fad1a73b6d2e3fa8ff80ae39cf554e1&w=900' },
    { title: 'Часто задаваемые вопросы', description: 'Почему нужно удалять зубы мудрости? Что такое имплантация зубов и как она проходит? В этом разделе мы отвечаем на самые популярные вопросы наших пациентов, чтобы вы могли чувствовать себя уверенно и информированно перед визитом к стоматологу.', image: 'https://img.freepik.com/premium-photo/person-holding-pair-scissors-with-question-marks-it_646443-2521.jpg?w=900' },
]

export const admin_links = {
    "ADMIN": [
        // { title: 'Главная', icon: AkDashboard, url: '/admin' },
        { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors' },
        { title: 'Пациенты', icon: FaUserInjured, url: '/admin/patients' },
        { title: 'Услуги', icon: GlWork, url: '/admin/services' },
        { title: 'Отзывы', icon: AnOutlinedMessage, url: '/admin/reviews' },
        
        { title: 'Первоначальные записи', icon: CgList, url: '/admin/initial-records' },
        { title: 'Записи на прием', icon: CaDataTable, url: '/admin/appointments' },
        // { title: 'Записи (для докторов)', icon: CdTable, url: '/admin/appointments-doctors' },
        { title: 'Зарплата', icon: ReMoneyDollarCircleLine, url: '/admin/salaries' },
        { title: 'Приходы/Расходы', icon: CaReportData, url: '/admin/reports' },
        { title: 'Отчет', icon: TaReport, url: '/admin/report' },
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
    { icon: BxHomeAlt2, title: 'nav.home', url: '/' },
    { icon: FlDataUsage, title: 'nav.about', url: '/about' },
    { icon: MaDoctor, title: 'nav.doctors', url: '/doctors' },
    { icon: GlStatusHealth, title: 'nav.services', url: '/services' },
    { icon: CaPhone, title: 'nav.contacts', url: '/contact' },
    // <FlDataUsage/>
]

export const getTimeDifferenceInMilliseconds = (time1: string, time2: string) => {
    // Split the time strings into hours and minutes
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Create Date objects with the same date but different times
    const date1: any = new Date();
    date1.setHours(hours1, minutes1, 0, 0);

    const date2: any = new Date();
    date2.setHours(hours2, minutes2, 0, 0);

    // Calculate the difference in milliseconds
    return Math.abs(date2 - date1);
}

export const timeToDecimal = (time: string) => {
    var parts = time.split(":");
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);

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

export const specs = {
    therapy: 'Терапия',
    surgery: 'Хирургия',
    orthodontics: 'Ортодонтия',
    orthopedics: 'Ортопедия'
}

export const appointment_statuses = {
    "PN": ["В ожидании", "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200", "text-yellow-400"],
    "FP": ["Полностью оплачено", "bg-green-500 hover:bg-green-400 active:bg-green-300", "text-green-500"],
    "PP": ["Частично оплачено", "bg-orange-500 hover:bg-orange-400 active:bg-orange-300", "text-orange-500"],
    "UP": ["Неоплачено", "bg-red-500 hover:bg-red-400 active:bg-red-300", "text-red-500"],
    "CD": ["Отменено", "bg-gray-600 hover:bg-gray-500 active:bg-gray-400", "text-gray-600"],
}