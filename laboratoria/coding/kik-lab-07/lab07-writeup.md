# Laboratorium 7: Grafika komputerowa
## Opracowanie zestawu zadań (część teoretyczna)
### Kacper Bednarczuk

---
### Zadanie 1.1: Zastosowania grafiki

Wybrane dziedziny zastosowań grafiki komputerowej:

1.  **Wspomaganie prac inżynierskich (CAD/CAM)**
    Grafika komputerowa w systemach CAD (Computer Aided Design) zastępuje tradycyjne deski kreślarskie, umożliwiając tworzenie precyzyjnych rysunków technicznych i modeli 3D. Systemy CAM (Computer Aided Manufacturing) wykorzystują te dane do sterowania procesem produkcji i obróbki materiałów.

2.  **Medycyna**
    Kluczową rolą grafiki jest tutaj wizualizacja danych diagnostycznych pochodzących z tomografów komputerowych (CT) czy rezonansu magnetycznego (MRI). Pozwala na rekonstrukcję trójwymiarowych obrazów narządów wewnętrznych, co jest niezbędne przy planowaniu operacji i diagnozie.

3.  **Symulacja i wirtualna rzeczywistość**
    Służy do tworzenia realistycznych środowisk treningowych (np. symulatory lotu) bez ryzyka rzeczywistego zagrożenia. Wirtualna rzeczywistość (VR) pozwala na interaktywne generowanie obrazów reagujących w czasie rzeczywistym na ruchy użytkownika, tworząc iluzję przebywania w wykreowanym świecie.

---
### Zadanie 1.2: Porównanie modeli grafiki

Poniższa tabela przedstawia różnice między grafiką wektorową a rastrową:

| Cecha | Grafika wektorowa | Grafika rastrowa |
| :--- | :--- | :--- |
| **Sposób zapamiętania obrazu** | Sekwencyjna struktura danych obrazowych (opis matematyczny obiektów) | Obraz zapamiętywany w postaci mapy bitowej (siatka pikseli) |
| **Zajętość pamięci** | Zależna od skomplikowania obrazu (liczby obiektów) | Zależna od rozdzielczości i głębi barw (stała dla danego rozmiaru, niezależna od treści) |
| **Skalowalność** | Pełna możliwość skalowania bez utraty jakości | Brak skalowalności – przy powiększaniu widoczna pikselizacja (utrata jakości) |
| **Odbiór rysunku (jakość linii)** | Bardzo dobra jakość linii (ciągła, gładka), niezależna od urządzenia | Odbiór zależny od urządzenia (linia widoczna w postaci schodków – aliasing) |

---
### Zadanie 1.3: Studium przypadku (dobór modelu)

#### Scenariusz A: Logo firmy
**Wybór:** Grafika wektorowa.
**Uzasadnienie:**
Kluczową cechą wymaganą w tym scenariuszu jest **skalowalność**. Logo musi wyglądać idealnie zarówno na małej wizytówce, jak i na wielkim banerze. Grafika wektorowa, oparta na opisach matematycznych krzywych, pozwala na dowolną zmianę rozmiaru bez utraty jakości ("pikselizacji"), co jest niemożliwe do osiągnięcia w grafice rastrowej. Dodatkowo, logo zazwyczaj składa się z prostych kształtów geometrycznych, co sprzyja małej zajętości pamięci w formacie wektorowym.

#### Scenariusz B: Cyfrowa obróbka zdjęcia z wakacji
**Wybór:** Grafika rastrowa.
**Uzasadnienie:**
Zdjęcia ze swej natury są obrazami ciągłymi, zapisanymi jako mapa punktów (pikseli) o określonych kolorach. Edycja polegająca na poprawie kolorów czy usuwaniu obiektów (retusz) wymaga operowania na konkretnych pikselach ("plamie"), co jest istotą grafiki rastrowej. Grafika wektorowa nie nadaje się do zapisu fotorealistycznych obrazów o złożonych przejściach tonalnych.

---
### Zadanie 1.4: Analiza formatów plików

#### 1. Formaty nieskalowalne (rastrowe)

* **JPG (JPEG)**
    * **Charakterystyka:** Zapis z pełną paletą barw, wykorzystujący stratną kompresję DCT.
    * **Główna zaleta:** Bardzo wydajna kompresja. (Prezentacja wspomina również o nowszej wersji JPEG 2000 o znacznie podwyższonej jakości).

* **PNG**
    * **Charakterystyka:** Unowocześniona wersja formatu GIF.
    * **Kompresja i barwy:** Stosuje wydajniejszą kompresję bezstratną oraz oferuje pełną paletę barw.
    * **Dodatkowe zalety:** Obsługa kanału Alfa (informacja o przezroczystości) oraz brak ograniczeń licencyjnych.

#### 2. Formaty skalowalne (wektorowe)

* **PS (Postscript)**
    * Język opisu strony opracowany przez firmę Adobe.

* **SVG**
    * Standard opracowany w oparciu o język XML na potrzeby WWW.

---
### Adnotacja dotycząca źródeł

Zgodnie z wytycznymi zawartymi w treści poszczególnych zadań (nakazującymi bazować „wyłącznie na informacjach z prezentacji”), w powyższym opracowaniu pominięto źródła zewnętrzne, traktując polecenia szczegółowe jako nadrzędne wobec ogólnego wstępu.