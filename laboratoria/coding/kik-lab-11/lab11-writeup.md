# Laboratorium 11: Iluzja ruchu – od fizjologii oka do cyfrowego piksela
## Opracowanie zestawu zadań (część opisowa i obliczeniowa)
### Kacper Bednarczuk

---
#### Część 1: Fizjologia i percepcja (teoria)
##### Zadanie 1.1: Dlaczego obraz się rusza?

**1. Bezwładność wzroku (Persistence of Vision)**
Jest to teoria historyczna, która zakładała, że postrzeganie płynnego ruchu wynika z fizjologicznej cechy oka (lub mózgu), polegającej na zachowywaniu powidoku poprzedniego obrazu przez ułamek sekundy. Według tej hipotezy, obrazy miałyby się "zlewać" ze sobą, wypełniając luki czasowe między klatkami. Współczesna nauka o percepcji odrzuca tę teorię, uznając ją za mit, który nie tłumaczy poprawnie mechanizmu widzenia ruchu w kinie, a zjawisko powidoków może wręcz zakłócać percepcję ruchu, zamiast ją wspomagać.

**2. Zjawisko Phi / Ruch Beta (Phi Phenomenon)**
Jest to obecnie wiodąca teoria (psychologiczna/neurologiczna), wywodząca się z psychologii Gestalt (psychologii postaci). Wyjaśnia ona iluzję ruchu jako wynik procesów poznawczych zachodzących w mózgu, a nie wady oka. Max Wertheimer wyróżnił dwa typy tego zjawiska:
* **Ruch Beta:** Złudzenie, w którym statyczne obiekty wyświetlane w różnych miejscach są interpretowane jako jeden obiekt zmieniający pozycję.
* **Zjawisko Phi:** Wrażenie "czystego ruchu" bez postrzegania przemieszczającego się obiektu (np. wrażenie ruchu cienia lub tła).

**3. Pytanie kontrolne: Flicker Fusion Threshold**
Przeciętny człowiek przestaje widzieć migotanie, a zaczyna postrzegać ciągłe światło przy częstotliwości ok. **48–50 Hz**.
* Standard kinowy to **24 kl./s** (24 Hz), co jest wartością zbyt niską, by oszukać oko i wyeliminować zauważalne migotanie obrazu.
* W projektorach analogowych stosowano migawkę, która przysłaniała światło dwukrotnie w trakcie wyświetlania jednej klatki (lub trzykrotnie w starszych systemach).
* Dzięki temu, mimo że informacja o ruchu aktualizowana jest tylko 24 razy na sekundę, częstotliwość błysków światła wzrasta do:
    $$24 \text{ kl./s} \cdot 2 = 48 \text{ Hz}$$
    Taka częstotliwość pozwala na osiągnięcie progu flicker fusion, eliminując męczące migotanie.

>[!info] Wykorzystane źródła:
> http://visual-memory.co.uk/daniel/Modules/FM21820/visper08.html
> https://pmc.ncbi.nlm.nih.gov/articles/PMC3482144/

---
##### Zadanie 1.2: Klatkaż (Frame Rate) a odczucia widza

**1. Który obraz wydaje się bardziej "realistyczny/dokumentalny"?**
Obraz wyświetlany w **60 FPS** (oraz wyższych wartościach) jest odbierany jako bardziej realistyczny, dokumentalny i bezpośredni. Ze względu na dwukrotnie większą liczbę próbek ruchu na sekundę w porównaniu do standardu kinowego, obraz staje się hiper-realistyczny i niezwykle płynny.
* Zjawisko to określane jest mianem **Soap Opera Effect** (efekt opery mydlanej). Wynika ono z historycznego skojarzenia wysokiej płynności obrazu z produkcjami telewizyjnymi (takimi jak wiadomości, sport czy właśnie telenowele), które nagrywano kamerami wideo.
* Wysoki klatkaż zmniejsza rozmycie ruchu (motion blur), co sprawia, że obraz jest ostrzejszy, ale przez to traci swoją "magiczną" barierę, wyglądając jak surowy zapis rzeczywistości lub gra wideo.

**2. Dlaczego filmy akcji w 24 FPS wydają się bardziej "kinowe"?**
Mimo mniejszej płynności, **24 FPS** jest uznawane za standard kinowy z kilku kluczowych powodów:
1. **Estetyka odrealnienia (Dreamlike quality):** 24 klatki na sekundę to kompromis, który zapewnia płynność wystarczająco wysoką do iluzji ruchu, ale jednocześnie na tyle niską, że obraz różni się od tego, jak postrzegamy rzeczywistość na żywo. Pomaga to w "zawieszeniu niewiary" (suspension of disbelief), pozwalając widzowi zanurzyć się w narracji fabularnej, zamiast skupiać się na surowym realizmie scenografii i aktorów.
2. **Rozmycie ruchu (Motion Blur):** Przy 24 FPS i standardowym kącie otwarcia migawki (180°), szybko poruszające się obiekty ulegają naturalnemu rozmyciu. To specyficzne rozmycie maskuje brakujące informacje o ruchu między klatkami i jest elementem języka wizualnego, do którego widzowie przyzwyczajeni są od niemal stu lat.
3. **Kulturowe przyzwyczajenie:** Przez dekady kojarzyliśmy specyficzną kadencję i lekkie „szarpanie” (judder) obrazu 24 FPS z wysokobudżetowymi produkcjami kinowymi, podczas gdy idealna płynność była domeną tańszych produkcji telewizyjnych.

>[!info] Wykorzystane źródła:
> https://www.coconut.co/articles/24fps-vs-30fps-vs-60fps-the-science
> https://camerabutter.com/blogs/the-camera-butter-reel/frame-rate-motion-blur-and-the-cinematic-look

---
#### Część 2: Technika Filmowa i Motion Blur (obliczenia)

**1. Zasada 180 stopni**
Jest to standardowa reguła w kinematografii, która mówi, że aby uzyskać naturalne rozmycie ruchu przypominające sposób, w jaki widzi ludzkie oko, migawka powinna być otwarta przez połowę czasu trwania klatki. W przełożeniu na czas naświetlania oznacza to, że mianownik ułamka czasu powinien być dwukrotnością liczby klatek na sekundę.

**2. Wzór ogólny dla dowolnego kąta:**
$$ \text{Czas} = \frac{1}{\text{FPS} \cdot \frac{360}{\text{Kąt}}} $$

**3. Uzupełniona tabela:**

| Zastosowanie | FPS | Kąt migawki | Czas naświetlania (s) | Efekt wizualny |
| :--- | :---: | :---: | :---: | :--- |
| Kino standard | 24 | 180° | 1/48 (zaokr. 1/50) | Naturalny, płynny ruch (standard kinowy) |
| TV Sport / Gry | 60 | 180° | 1/120 | Bardzo płynny, ostry ruch |
| Efekt Szeregowca Ryana | 24 | 45° (wąski) | 1/192 (lub ~1/200) | Ruch szarpany (staccato), brak rozmycia, wysoka ostrość wybuchów |
| Slow Motion | 120 | 180° | 1/240 | Płynne zwolnienie 4-krotne (jeśli odtworzymy w 60 FPS) |

**4. Analiza obliczeń:**
1. **TV Sport / Gry (60 FPS):**
    Stosując zasadę 180 stopni dla 60 klatek:
    $$ \text{Czas} = \frac{1}{60 \cdot 2} = \frac{1}{120} \text{ s} $$
    Utrzymanie kąta 180° przy 60 FPS pozwala zachować naturalne rozmycie, unikając sztucznego, operowego wyglądu, mimo wysokiej płynności.

2. **Efekt Szeregowca Ryana (Narrow Shutter):**
    Tutaj łamiemy zasadę 180 stopni, zmniejszając kąt do 45°. Skraca to czas naświetlania, eliminując rozmycie ruchu. Każda klatka jest idealnie ostra, co przy odtwarzaniu daje wrażenie chaotycznego, szarpanego ruchu (judder/staccato), idealnego do scen batalistycznych.
    $$ \text{Czas} = \frac{1}{24 \cdot \frac{360}{45}} = \frac{1}{24 \cdot 8} = \frac{1}{192} \text{ s} $$

3. **Slow Motion (1/240 s):**
    Aby zachować zasadę 180 stopni przy czasie naświetlania 1/240 s, musimy obliczyć klatkaż:
    $$ \text{FPS} = \frac{1}{2 \cdot \text{Czas}} = \frac{1}{2 \cdot \frac{1}{240}} = 120 \text{ FPS} $$
    Nagrywanie w 120 FPS pozwala na uzyskanie wysokiej jakości zwolnionego tempa przy zachowaniu odpowiedniej ilości światła i rozmycia.

>[!info] Wykorzystane źródła:
> https://camerabutter.com/blogs/the-camera-butter-reel/frame-rate-motion-blur-and-the-cinematic-look

---
#### Część 3: Aliasing czasowy (inżynieria)

Zjawisko to, znane jako **Wagon Wheel Effect**, wynika z "aliasingu" (nakładania się widm) spowodowanego zbyt niską częstotliwością próbkowania (klatkażem) w stosunku do częstotliwości zdarzenia (obrotu koła). Zgodnie z twierdzeniem Nyquista-Shannona, kamera nagrywająca w 24 FPS nie jest w stanie poprawnie odwzorować ruchu cyklicznego o częstotliwości wyższej niż 12 Hz (połowa częstotliwości próbkowania).

**Analiza przypadków:**

1. **Koło kręci się 24 obroty na sekundę (24 Hz):**
    * **Analiza:** Kamera rejestruje obraz dokładnie 24 razy na sekundę. W czasie trwania jednej klatki ($1/24$ sekundy) koło wykonuje dokładnie jeden pełny obrót ($360^\circ$).
    * **Wynik wizualny:** Szprycha na każdej klatce znajdzie się **w tej samej pozycji**. Dla obserwatora koło będzie wyglądać na **stacjonarne (nieruchome)**, mimo że w rzeczywistości porusza się bardzo szybko. Jest to efekt stroboskopowy.

    ![[24hz.png]]

2. **Koło kręci się 23 obroty na sekundę (23 Hz):**
    * **Analiza:** W czasie między klatkami ($1/24$ s) koło wykonuje $\frac{23}{24}$ pełnego obrotu. Do pełnego zamknięcia koła brakuje $\frac{1}{24}$ obrotu.
    * **Wynik wizualny:** Na każdej kolejnej klatce szprycha będzie widoczna nieco "wcześniej" (przesunięta do tyłu) względem poprzedniej pozycji. Mózg interpretuje to jako najkrótszą drogę ruchu, więc zobaczymy **ruch wsteczny** (koło kręci się do tyłu).
    *   **Prędkość wizualna:** Koło będzie wyglądać, jakby kręciło się do tyłu z prędkością **1 obrotu na sekundę** ($24 \text{ FPS} - 23 \text{ Hz} = 1 \text{ Hz}$).

    ![[23hz.png]]

3. **Koło kręci się 12 obrotów na sekundę (12 Hz):**
    * **Analiza:** Prędkość koła wynosi dokładnie połowę częstotliwości próbkowania kamery (granica Nyquista). W czasie między klatkami koło wykonuje dokładnie **pół obrotu** ($180^\circ$).
    * **Wynik wizualny:** Jeśli szprycha zaczyna na górze (godzina 12:00), na następnej klatce będzie na dole (godzina 6:00), na kolejnej znów na górze itd.
    * **Efekt:** Zobaczymy migotanie lub przeskakiwanie szprychy między dwiema pozycjami. **Niemożliwe jest określenie kierunku ruchu** – mózg nie jest w stanie stwierdzić, czy koło kręci się w prawo, czy w lewo. To klasyczny przykład wieloznaczności wynikającej z osiągnięcia limitu Nyquista.

    ![[12hz.png]]

>[!info] Wykorzystane źródła
> https://jackschaedler.github.io/circles-sines-signals/sampling4.html

---
#### Część 4: Rejestracja ruchu (Motion Capture) - nowoczesność

Technologia Motion Capture (Mocap) ewoluowała, oferując obecnie dwa główne podejścia: precyzyjne systemy oparte na kamerach oraz mobilne systemy oparte na czujnikach. Wybór odpowiedniej technologii zależy od balansu między wymaganą precyzją, budżetem a swobodą ruchu.

**Tabela porównawcza:**

| Cecha | System optyczny (pasywny) | System inercyjny (Inertial) |
| :--- | :--- | :--- |
| **Zasada działania** | Kamery IR + odblaskowe kulki (markery) | **Czujniki IMU** (akcelerometry, żyroskopy, magnetometry) montowane bezpośrednio na ciele aktora, przesyłające dane bezprzewodowo. |
| **Przestrzeń (Volume)** | Ograniczona do studia z kamerami (wymagana widoczność) | **Nieograniczona / Wysoka mobilność**. Możliwość nagrywania w dowolnym środowisku, w tym w plenerze, na zewnątrz i w małych pomieszczeniach, bez konieczności instalacji kamer. |
| **Podatność na błąd** | Zasłonięcie markera (Occlusion) | **Dryf (Drift)** – błąd pozycji kumulujący się w czasie, wynikający z niedokładności czujników, wymagający okresowej rekalibracji. |
| **Koszt** | Bardzo wysoki (sprzęt, studio, obsługa) | **Niski / Umiarkowany** (dostępny dla studiów niezależnych i mniejszych produkcji). |

**Podsumowanie różnic:**
Systemy optyczne oferują bezkonkurencyjną dokładność (często sub-milimetrową) i brak problemu dryfu, co czyni je standardem w wysokobudżetowych produkcjach filmowych i grach, gdzie kluczowy jest detal. Z kolei systemy inercyjne (IMU) zrewolucjonizowały rynek dzięki swojej przenośności i łatwości konfiguracji. Są idealne do zastosowań w czasie rzeczywistym oraz w trudnych warunkach (np. pełne słońce, brak miejsca na kamery), choć odbywa się to kosztem niższej precyzji absolutnej.

>[!info] Wykorzystane źródła
> https://qsense-motion.com/camera-based-motion-capture-system/
> https://animost.com/ideas-inspirations/optical-vs-inertial-motion-capture/