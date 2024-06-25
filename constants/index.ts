import {
    LaToothSolid,
    HeOutlineDoctorMale,
    BsHospital,
    BsCalendar2Week,
    HeFilledDoctorMale,
    MaDoctor,
    GlWork,
    CdTable,
    HeOutlineMedicalRecords,
    CaDataTable,
    FaUserInjured,
    CaReportData,
    AnOutlinedComment,
    PhTooth,
    ReStarSmileLine,
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
        { title: 'Отзывы', icon: AnOutlinedComment, url: '/admin/reviews' },
        
        { title: 'Первоначальные записи', icon: HeOutlineMedicalRecords, url: '/admin/initial-records' },
        { title: 'Записи на прием', icon: CaDataTable, url: '/admin/appointments' },
        { title: 'Записи (для докторов)', icon: CdTable, url: '/admin/appointments-doctors' },
        { title: 'Приходы/Расходы', icon: CaReportData, url: '/admin/reports' },
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
    { title: 'nav.home', url: '/' },
    { title: 'nav.about', url: '/about' },
    { title: 'nav.doctors', url: '/doctors' },
    { title: 'nav.services', url: '/services' },
    { title: 'nav.contacts', url: '/contact' },
]

// export const formatDate = (dateString: string, prefix1: ', ' | 'T' = ', ') => {
    
//     const [date, time] = dateString.split(prefix1)
//     const [hours, minutes] = time.split(":")
//     const dateSplit = new Date(date)
    
//     let year = dateSplit.getFullYear(),
//         month = dateSplit.getMonth()+1,
//         day = dateSplit.getDate()

//     return `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}T${hours}:${minutes}`
// }

export const formatDate = (dateString: string, prefix1: ', ' | 'T' | '-' = ', ') => {
    const [date, time] = dateString.split(prefix1);

    let hours: number;
    let minutes: string;
    let period: string | undefined;

    // Check if the time part contains AM or PM
    if (time.includes('AM') || time.includes('PM')) {
        [hours, minutes] = time.slice(0, -2).split(":").map(Number) as any;
        period = time.slice(-2);

        // Convert 12-hour time to 24-hour time
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
    } else {
        [hours, minutes] = time.split(":").map(Number) as any;
    }

    const dateSplit = new Date(date);
    let year = dateSplit.getFullYear(),
        month = dateSplit.getMonth() + 1,
        day = dateSplit.getDate();
    console.log(`%c=====================================`, 'color: yellow');

    console.log(`date string: ${dateString}`);
    console.log(`date: ${date}`);
    console.log(`day: ${day}, month: ${month}, year: ${year}`);
    console.log(`hour: ${hours}, minutes: ${minutes}`);
    
    
    // Ensure month and day are two digits
    const formattedMonth = month > 9 ? month : '0' + month;
    const formattedDay = day > 9 ? day : '0' + day;
    
    // Ensure hours and minutes are two digits
    const formattedHours = hours > 9 ? hours : '0' + hours;
    const formattedMinutes = +minutes > 9 ? minutes : '0' + minutes;
    console.log(`result: ${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`);
    console.log(`%c=====================================`, 'color: yellow');
    
    return `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`;
};

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

export const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const specs = {
    therapy: 'Терапия',
    surgery: 'Хирургия',
    orthodontics: 'Ортодонтия',
    orthopedics: 'Ортопедия'
}

export const appointment_statuses = {
    "PN": ["В ожидании", "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-300"],
    "PD": ["Оплачено", "bg-green-500 hover:bg-green-400 active:bg-green-300"],
    "UP": ["Неоплачено", "bg-red-500 hover:bg-red-400 active:bg-red-300"],
    "CD": ["Отменено", "bg-gray-600 hover:bg-gray-500 active:bg-gray-400"],
}