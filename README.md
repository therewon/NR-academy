# NR Academy — Frontend

Vite + React + TypeScript + Tailwind + SCSS. Bütün 9 Figma səhifəsi yığılıb və mümkün olan yerlərdə **real backend** (`NrAcademyy` .NET həlli) ilə bağlanıb.

Tam uyğunluq analizi üçün bax: `figma-backend-analiz.md` (əvvəllər göndərilib).

## İşə salmaq

```bash
npm install
npm run dev
```

Backend-i lokal işə sal (`NrAcademyy` solution, Visual Studio/`dotnet run`) — adətən `http://localhost:5287` ünvanında qalxır. `.env`-dəki `VITE_API_BASE_URL` artıq bura yönləndirilib.

## Hansı hissə real API-yə bağlıdır?

| Səhifə/Bölmə | Mənbə | Qeyd |
|---|---|---|
| Kurslar (siyahı + detal) | ✅ Real `GET /api/Course`, `GET /api/Course/{id}` | Kateqoriya rəngi/ikonu `utils/courseCategoryPresentation.ts`-də açar sözlə təxmin edilir (`CourseCategory` backend-də hələ bağlanmayıb) |
| Müəllimlər | ✅ Real `GET /api/Teacher` | "Öyrətdiyi fənlər" `utils/deriveTeacherSubjects.ts` ilə kursların adından çıxarılır |
| Testimonials (video rəylər) | ❌ Mock (`data/testimonials.data.ts`) | Backend-in `Testimonial` modeli foto/video/ad saxlamır — bax analiz sənədi, bölmə 8 |
| FAQ (Ana səhifə + FAQ səhifəsi) | ❌ Mock (`data/faq.data.ts`, `data/faqPage.data.ts`) | Backend-də FAQ üçün ayrıca endpoint yoxdur |
| CTA/Əlaqə formu | ❌ Mock (console.log) | Açıq (anonim) "lead" endpoint-i yoxdur |
| Test/Sual/Nəticə | ❌ Tam mock (`data/quiz.mock.ts`, `context/QuizContext.tsx`) | `TestsController` bütünlüklə `[Authorize]`-dır — anonim istifadəçi üçün açılmayınca real API-yə keçə bilmərik |
| Qeydiyyat modalı | ❌ Mock qeydiyyat, ✅ real login | Figma modalı (Ad+Sinif) real `RegisterDTO` (email+parol) ilə uyğun gəlmir; giriş (login) isə tam uyğundur və real `/api/Auth/Login`-ə bağlıdır |

Hər mock yerdə kodun için izahlı şərh var (`// ALWAYS mock — bax analiz sənədi...`) — backend developer cavab verdikcə bunları real endpoint-ə çevirmək tək bir funksiyanın içini dəyişmək qədər sadədir.

## Yeni səhifələr

- `/haqqimizda` — Haqqımızda (böyük hissəsi statik marketinq kontenti)
- `/kurslar`, `/kurslar/:id` — Kurs kataloqu + detal (kurikulum hissəsi hələ generic/mock)
- `/muellimler` — Fənn filtri ilə tam müəllim siyahısı
- `/faq` — Xüsusi FAQ səhifəsi
- `/elaqe` — Əlaqə + xəritə
- `/test` → `/test/sual/:step` → `/test/neticə` — Tam test axını (mock sual bankı ilə)
- `/qeydiyyat` — Qeydiyyat/giriş modalı (həm birbaşa, həm test nəticəsindən avtomatik açılır)

Qalan struktur (qovluq təşkili, backend inteqrasiya qatı və s.) əvvəlki README-də izah olunub.
