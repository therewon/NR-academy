export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
}

export const milestones: Milestone[] = [
  {
    id: 'm-2021',
    year: '2021',
    title: '10 iyun 2021-ci ildə qarşımıza sadə, lakin aydın bir məqsəd qoyduq: keyfiyyətli təhsili əlçatan etmək.',
    subtitle: 'İlk dərslərimizi kiçik qruplarla, lakin böyük inamla başladıq. Hər tələbənin adını, məqsədini və çətinliyini tanıdığımız bir mühit qurduq — bu prinsip bu gün də dəyişməz qalır.',
  },
  {
    id: 'm-2022',
    year: '2022',
    title: 'Müştərilərimizin əldə etdiyi nəticələr bizə sübut etdi ki, seçdiyimiz yol doğrudur.',
  },
];

export interface StudentReview {
  id: string;
  name: string;
  avatar: string;
  text: string;
  color: 'pink' | 'green' | 'yellow' | 'blue' | 'purple';
}

export const studentReviews: StudentReview[] = [
  {
    id: 'sr-1',
    name: 'Rəna',
    avatar: 'https://i.pravatar.cc/80?img=32',
    text: 'Dərslər həm öyrədici, həm də əyləncəlidi. Ünsiyyət bacarığım və danışıq mədəniyyətim çox inkişaf etdi.',
    color: 'pink',
  },
  {
    id: 'sr-2',
    name: 'Günay',
    avatar: 'https://i.pravatar.cc/80?img=45',
    text: 'İngilis dilini öyrənməyə sıfırdan başlamışdım və qısa müddətdə belə nəticə əldə edəcəyimi düşünmürdüm.',
    color: 'green',
  },
  {
    id: 'sr-3',
    name: 'Aysel',
    avatar: 'https://i.pravatar.cc/80?img=44',
    text: 'Oğlum dərslərə həvəslə gəlir. Qısa müddətdə həm hərfləri, həm də rəqəmləri daha rahat öyrənməyə başladı.',
    color: 'yellow',
  },
  {
    id: 'sr-4',
    name: 'Əli',
    avatar: 'https://i.pravatar.cc/80?img=51',
    text: 'Müəllimlər çətin sualları fərqli üsullarla izah edirlər. Hazırlıq proqramı sayəsində özümə inamım artdı.',
    color: 'green',
  },
  {
    id: 'sr-5',
    name: 'Maryem',
    avatar: 'https://i.pravatar.cc/80?img=47',
    text: 'Universitetə qəbul olmaq ən böyük məqsədim idi. Hazırlıq müddətində keçirdiyim sınaq imtahanları və müəllimlərin dəstəyi sayəsində özümə inam qazandım.',
    color: 'blue',
  },
  {
    id: 'sr-6',
    name: 'Cavid',
    avatar: 'https://i.pravatar.cc/80?img=59',
    text: 'Bəzi mövzuları məktəbdə başa düşmürdüm. Müəllimlər hər mövzunu sadə dillə izah edirlər.',
    color: 'yellow',
  },
  {
    id: 'sr-7',
    name: 'Aynur',
    avatar: 'https://i.pravatar.cc/80?img=48',
    text: 'Övladımın nəticələrində qısa müddətdə böyük dəyişiklik gördük. Dərslər çox şəkildə fərqli keçirilir.',
    color: 'purple',
  },
  {
    id: 'sr-8',
    name: 'Günay',
    avatar: 'https://i.pravatar.cc/80?img=43',
    text: 'Dərslər həm qrammatikaya, həm də danışıq bacarığına yönəlib. Hər mövzu sadə və aydın şəkildə izah edildi.',
    color: 'green',
  },
];

export const timelineFooterText =
  'Tədris proqramını tələbələrdən aldığımız rəylər əsasında təkmilləşdirməyə başladıq. Bu mərhələdə fərdi yanaşma prinsipini institusional standarda çevirdik: hər tələbə üçün ayrıca inkişaf izləməsi tətbiq olunmağa başladı.';
