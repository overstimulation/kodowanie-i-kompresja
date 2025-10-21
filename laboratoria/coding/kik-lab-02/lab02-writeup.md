# Laboratorium 2: Systemy liczbowe
## Opracowanie zestawu zadań (część teoretyczna)
### Kacper Bednarczuk

---
## Systemy Liczbowe: Binarny i Szesnastkowy
W ramach zadania wybrałem dwa pozycyjne systemy liczbowe: **system binarny** oraz **system szesnastkowy**.

---
## 1. Opis Systemów

### System Binarny (Dwójkowy)

**Formalna definicja:**
- **Podstawa (b):** $b = 2$
- **Zbiór cyfr:** $\{0, 1\}$

Liczbę w systemie binarnym $L = (c_{n-1}c_{n-2}...c_1c_0)_2$ można przedstawić za pomocą wzoru:
$$ L = \sum_{i=0}^{n-1} c_i \cdot 2^i $$gdzie $c_i$ to cyfry binarne (bity).

**Główne zastosowania:**
System binarny jest fundamentalnym systemem dla całej współczesnej elektroniki cyfrowej i informatyki. Jego główne zastosowania to:
- **Reprezentacja danych w komputerach:** Wszystkie dane, takie jak liczby, tekst czy instrukcje procesora, są przechowywane i przetwarzane w formie binarnej.
- **Układy logiczne:** Bramki logiczne (AND, OR, NOT itd.) operują na sygnałach reprezentujących bity (0 i 1), co stanowi podstawę budowy procesorów i innych układów cyfrowych.
- **Przechowywanie danych:** Na nośnikach takich jak dyski twarde, SSD czy pamięć RAM, dane są zapisywane jako ciągi bitów.
<div class="page-break" style="page-break-before: always;"></div>

### System Szesnastkowy (Heksadecymalny)

**Formalna definicja:**
- **Podstawa (b):** $b = 16$
- **Zbiór cyfr:** $\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}$, gdzie litery odpowiadają wartościom dziesiętnym:
  - $A = 10$
  - $B = 11$
  - $C = 12$
  - $D = 13$
  - $E = 14$
  - $F = 15$

Liczbę w systemie szesnastkowym $L = (h_{n-1}h_{n-2}...h_1h_0)_{16}$ można przedstawić wzorem:
$$ L = \sum_{i=0}^{n-1} h_i \cdot 16^i $$
gdzie $h_i$ to cyfry heksadecymalne.

**Główne zastosowania:**
System szesnastkowy jest szeroko stosowany w informatyce jako bardziej zwarta i czytelna dla człowieka reprezentacja danych binarnych.
- **Adresowanie pamięci:** Adresy w pamięci RAM są często przedstawiane w formacie heksadecymalnym.
- **Reprezentacja kolorów:** W standardach takich jak RGB (np. w HTML/CSS), kolory są definiowane za pomocą wartości szesnastkowych (np. `#FFFFFF` dla bieli).
- **Debugowanie i programowanie niskopoziomowe:** Ułatwia analizę zrzutów pamięci (ang. *memory dumps*) i surowych danych binarnych. Jedna cyfra heksadecymalna odpowiada dokładnie czterem bitom (półbajtowi), co ułatwia konwersję.

---
## 2. Algorytmy Konwersji

### Konwersja z Systemu Binarnego na Szesnastkowy

Algorytm konwersji liczby binarnej na szesnastkową opiera się na fakcie, że $16 = 2^4$. Oznacza to, że każdej grupie czterech cyfr binarnych odpowiada dokładnie jedna cyfra szesnastkowa.

**Kroki algorytmu:**
1.  Podziel liczbę binarną na grupy po 4 cyfry, zaczynając od prawej strony (od najmniej znaczącego bitu).
2.  Jeśli ostatnia (lewa) grupa nie ma 4 cyfr, uzupełnij ją zerami od lewej strony.
3.  Każdą 4-bitową grupę zamień na odpowiadającą jej cyfrę szesnastkową, zgodnie z poniższą tabelą:

| Binarne | Szesnastkowe  |
| :-----: | :-----------: |
|  0000   |       0       |
|  0001   |       1       |
|  0010   |       2       |
|  0011   |       3       |
|  0100   |       4       |
|  0101   |       5       |
|  0110   |       6       |
|  0111   |       7       |
|  1000   |       8       |
|  1001   |       9       |
|  1010   |       A       |
|  1011   |       B       |
|  1100   |       C       |
|  1101   |       D       |
|  1110   |       E       |
|  1111   |       F       |

4.  Połącz otrzymane cyfry szesnastkowe, aby uzyskać ostateczny wynik.

**Przykład:**
Konwersja liczby $(1101011011110101)_2$ na system szesnastkowy.
1.  Dzielimy liczbę na 4-bitowe grupy: $(1101\ 0110\ 1111\ 0101)_2$
2.  Każda grupa ma 4 bity, więc nie ma potrzeby uzupełniania zerami.
3.  Konwertujemy każdą grupę:
    - $(1101)_2 = 1 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 = 8 + 4 + 0 + 1 = (13)_{10} = (D)_{16}$
    - $(0110)_2 = 0 \cdot 2^3 + 1 \cdot 2^2 + 1 \cdot 2^1 + 0 \cdot 2^0 = 0 + 4 + 2 + 0 = (6)_{10} = (6)_{16}$
    - $(1111)_2 = 1 \cdot 2^3 + 1 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 8 + 4 + 2 + 1 = (15)_{10} = (F)_{16}$
    - $(0101)_2 = 0 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 = 0 + 4 + 0 + 1 = (5)_{10} = (5)_{16}$
1.  Łączymy wyniki: $(1101011011110101)_2 = (D6F5)_{16}$

### Konwersja z Systemu Szesnastkowego na Dziesiętny

Algorytm konwersji liczby szesnastkowej na dziesiętną polega na obliczeniu sumy wartości poszczególnych cyfr pomnożonych przez odpowiednie potęgi podstawy systemu ($16$).

**Kroki algorytmu:**
1.  Zapisz liczbę szesnastkową i ponumeruj jej cyfry od prawej do lewej, zaczynając od 0. Numer $i$ odpowiada potędze, do której podniesiona zostanie podstawa 16.
2.  Każdą cyfrę szesnastkową zamień na jej odpowiednik w systemie dziesiętnym (np. $A \rightarrow 10, F \rightarrow 15$).
3.  Pomnóż każdą wartość dziesiętną cyfry przez $16^i$, gdzie $i$ to pozycja cyfry.
4.  Zsumuj wszystkie otrzymane iloczyny, aby uzyskać końcową wartość w systemie dziesiętnym.

**Przykład:**
Konwersja liczby $(D6F5)_{16}$ na system dziesiętny.
1.  Numerujemy pozycje od prawej do lewej:
    - $5$ - pozycja 0
    - $F$ - pozycja 1
    - $6$ - pozycja 2
    - $D$ - pozycja 3
2.  Zamieniamy cyfry na wartości dziesiętne:
    - $D \rightarrow 13$
    - $6 \rightarrow 6$
    - $F \rightarrow 15$
    - $5 \rightarrow 5$
3.  Mnożymy i sumujemy zgodnie ze wzorem:
    $$ L = (D \cdot 16^3) + (6 \cdot 16^2) + (F \cdot 16^1) + (5 \cdot 16^0) $$
    $$ L = (13 \cdot 16^3) + (6 \cdot 16^2) + (15 \cdot 16^1) + (5 \cdot 16^0) $$
    $$ L = (13 \cdot 4096) + (6 \cdot 256) + (15 \cdot 16) + (5 \cdot 1) $$
    $$ L = 53248 + 1536 + 240 + 5 $$
    $$ L = 55029 $$
4.  Ostateczny wynik: $(D6F5)_{16} = (55029)_{10}$

---
## 3. Wnioski

Systemy binarny i szesnastkowy są kluczowe w informatyce. System binarny jest podstawą działania komputerów, a szesnastkowy ułatwia pracę z danymi binarnymi, oferując bardziej zwięzły zapis. Prosta konwersja między nimi ($16 = 2^4$) sprawia, że są one nierozłączne w programowaniu niskopoziomowym, adresowaniu pamięci i reprezentacji danych, takich jak kolory.

---
## 4. Możliwe Rozszerzenia

- **Analiza systemu ósemkowego:** Zbadanie systemu o podstawie 8 i jego relacji z systemem binarnym.
- **Konwersja części ułamkowych:** Rozszerzenie algorytmów o obsługę liczb niecałkowitych.
- **Reprezentacja liczb ujemnych:** Analiza metod zapisu liczb ujemnych, np. kodu uzupełnień do dwóch (U2).