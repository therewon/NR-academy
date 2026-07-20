export interface CurriculumLevel {
  id: string;
  code: string;
  label: string;
  outcome: string;
  content: string[];
}

export const genericCurriculum: CurriculumLevel[] = [
  {
    id: 'lvl-0',
    code: 'Pre-A1',
    label: 'Sıfırdan',
    outcome: 'Əsas anlayışlarla tanışlıq, ilk dərsdə fəal iştirak.',
    content: ['Əlifba və tələffüz əsasları', 'Gündəlik salamlaşma ifadələri', 'Say və rəng adları'],
  },
  {
    id: 'lvl-1',
    code: 'A1',
    label: 'Başlanğıc',
    outcome: 'Sadə cümlələrlə özün haqqında danışmaq.',
    content: ['Sadə zaman formaları', 'Ailə və gündəlik həyat lüğəti', 'Qısa dialoqlar qurmaq'],
  },
  {
    id: 'lvl-2',
    code: 'A2',
    label: 'Elementar',
    outcome: 'Tanış mövzularda sərbəst ünsiyyət qurmaq.',
    content: ['Keçmiş zaman', 'Səyahət və alış-veriş lüğəti', 'Qısa mətnləri anlamaq'],
  },
  {
    id: 'lvl-3',
    code: 'B1',
    label: 'Orta',
    outcome: 'Fikirlərini əsaslandırıb izah etmək.',
    content: ['Şərti cümlələr', 'Fikrini müqayisə edərək izah etmək', 'Orta çətinlikdə mətn oxumaq'],
  },
  {
    id: 'lvl-4',
    code: 'B2',
    label: 'Yuxarı Orta',
    outcome: 'Mürəkkəb mövzularda sərbəst müzakirə aparmaq.',
    content: ['Passiv formalar', 'Akademik/iş lüğəti', 'Uzun mətnləri təhlil etmək'],
  },
  {
    id: 'lvl-5',
    code: 'C1',
    label: 'İrəli',
    outcome: 'Doğma danışan səviyyəsinə yaxın sərbəstlik.',
    content: ['İncə qrammatik fərqlər', 'Peşəkar prezentasiya bacarığı', 'Mürəkkəb mətnləri sərbəst təhlil'],
  },
];
