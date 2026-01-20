# Laboratorium 12: Algorytmika i inżynieria dźwięku cyfrowego
## Opracowanie zestawu zadań (część teoretyczna)
### Kacper Bednarczuk

---
### Zadanie 1.1: Cyfryzacja sygnału ciągłego

**1. Błąd kwantyzacji**
Z perspektywy informatycznej błąd kwantyzacji (szum kwantyzacji) to błąd zaokrąglenia wynikający z konieczności przypisania ciągłej wartości napięcia (sygnału analogowego) do najbliższego poziomu dyskretnego, dostępnego w skończonej puli wartości cyfrowych. Błąd ten jest nierozerwalnie związany z **rozdzielczością bitową** (bit depth), która określa liczbę dostępnych poziomów (np. 16 bitów = 65 536 poziomów).

Zwiększenie częstotliwości próbkowania (np. z 44,1 kHz do 96 kHz) **nie eliminuje błędu kwantyzacji**.
* Częstotliwość próbkowania odpowiada za gęstość pomiarów w czasie (oś pozioma), natomiast błąd kwantyzacji dotyczy precyzji pomiaru amplitudy (oś pionowa).
* Szum ten można zredukować jedynie poprzez zwiększenie rozdzielczości bitowej (np. przejście z 8 bitów na 16 bitów), co zagęszcza siatkę poziomów i zmniejsza dystans między wartością rzeczywistą a zapisaną.

**2. Aliasing**
W systemach cyfrowych stosowanie analogowego filtra dolnoprzepustowego (anty-aliasingowego) przed przetwornikiem A/C jest konieczne, aby spełnić założenia **twierdzenia Nyquista–Shannona**. Twierdzenie to mówi, że częstotliwość próbkowania musi być co najmniej dwukrotnie wyższa od najwyższej częstotliwości w sygnale wejściowym. Filtr ten usuwa ("obcina") częstotliwości, które przekraczają ten limit, zapobiegając ich błędnej interpretacji.

Gdybyśmy spróbowali zapisać dźwięk o częstotliwości **25 kHz** przy próbkowaniu **44,1 kHz** bez odpowiedniego filtrowania:
* Limit Nyquista wynosi: $44,1 \text{ kHz} / 2 = 22,05 \text{ kHz}$.
* Sygnał 25 kHz przekracza ten limit. Dochodzi do zjawiska *foldover* (aliasingu) – częstotliwość ta zostanie "odbita" w dół do pasma słyszalnego.
* Zostanie ona błędnie zapisana jako fałszywy dźwięk o częstotliwości:
    $$ |44,1 \text{ kHz} - 25 \text{ kHz}| = 19,1 \text{ kHz} $$
* Dla słuchacza będzie to słyszalne zniekształcenie (artefakt), którego nie było w oryginalnym nagraniu i którego nie da się później usunąć cyfrowo.

>[!info] Wykorzystane źródła:
> https://docs.cycling74.com/legacy/max5/tutorials/msp-tut/mspdigitalaudio.html
> Metody kompresji bezstratnej FLAC i APE, praca licencjacka - Dawid Szewczyk (UMCS)
> Formaty dźwięku, prezentacja - dr inż. Piotr Odya (Politechnika Gdańska)
> https://www.ni.com/en/shop/data-acquisition/measurement-fundamentals/analog-fundamentals/anti-aliasing-filters-and-their-usage-explained.html

---
### Zadanie 1.2: Złożoność obliczeniowa a architektura systemu

**1. System wbudowany**
W przypadku projektowania urządzenia o niskim poborze mocy, takiego jak odtwarzacz przenośny czy mikrokontroler bez jednostki FPU, zdecydowanie lepszym wyborem jest **FLAC**.
* **Charakterystyka obciążenia:** FLAC jest kodekiem **asymetrycznym**, zoptymalizowanym pod kątem szybkości dekodowania. Proces ten jest znacznie mniej obciążający obliczeniowo niż kodowanie, co pozwala na dekodowanie w czasie rzeczywistym nawet na sprzęcie o skromnej wydajności.
* **Brak FPU:** Kluczową zaletą FLAC w kontekście mikrokontrolerów jest fakt, że jego dekodowanie opiera się wyłącznie na **arytmetyce stałoprzecinkowej** (integer arithmetic). Dzięki temu procesor nie musi emulować operacji zmiennoprzecinkowych, co drastycznie oszczędza cykle zegara i energię baterii.
* **Kontrast z APE:** Monkey's Audio (APE) cechuje się symetrycznością i większym obciążeniem przy dekodowaniu (szczególnie w trybach wysokiej kompresji), co historycznie stanowiło problem dla urządzeń przenośnych, prowadząc do szybkiego zużycia baterii lub braku płynności odtwarzania.

**2. Scenariusz serwerowy**
W systemie archiwizacji danych dla biblioteki narodowej, gdzie priorytetem jest oszczędność miejsca, a pliki są zapisywane raz (WORM - Write Once, Read Many), optymalnym wyborem będzie **Monkey's Audio (APE)**.
* **Efektywność kompresji:** APE oferuje wyższy stopień kompresji niż FLAC (różnica rzędu 3–6% w zależności od ustawień i rodzaju muzyki). Przy skali biblioteki narodowej (petabajty danych), te kilka procent przekłada się na znaczące oszczędności w kosztach macierzy dyskowych.
* **Czas kompresji:** W scenariuszu archiwalnym długi czas kompresji (nawet 3-krotnie dłuższy niż we FLAC dla trybów *High/Insane*) jest pomijalny. Plik kompresowany jest tylko raz, a wysoki koszt obliczeniowy tego procesu jest akceptowalną ceną za mniejszy rozmiar pliku wynikowego.
* **Weryfikacja:** APE (podobnie jak FLAC) oferuje sumy kontrolne (CRC/MD5), co jest kluczowe dla integralności archiwum.

>[!info] Wykorzystane źródła:
> Metody kompresji bezstratnej FLAC i APE, praca licencjacka - Dawid Szewczyk (UMCS)
> https://xiph.org/flac/features.html
> https://mirror.ideaz.sk/Software/English/Audio%20and%20video/flac-1.2.1-win/doc/html/comparison.html
> https://wiki.hydrogenaudio.org/index.php?title=Monkey%27s_Audio
> http://audiograaf.nl/losslesstest/Lossless%20audio%20codec%20comparison%20-%20revision%204.pdf

---
### Zadanie 1.3: Integralność danych

Formaty bezstratne, takie jak FLAC czy APE, stosują wielopoziomowe mechanizmy weryfikacji, aby zagwarantować, że odzyskany sygnał jest matematycznie identyczny z oryginałem ("bit-perfect") i chronić archiwum przed zjawiskiem "gnicia bitów" (*bit rot*).

**1. Sumy kontrolne ramek (CRC)**
Podstawowym mechanizmem jest podział strumienia danych na bloki (ramki) i dołączenie do każdego z nich sumy kontrolnej **CRC** (Cyclic Redundancy Check).
* W formacie **FLAC** każda ramka zawiera 16-bitową sumę CRC (CRC-16) obliczoną na podstawie jej zawartości. Pozwala to na wykrycie błędów transmisji "w locie" i precyzyjne zlokalizowanie uszkodzonego fragmentu (zazwyczaj ułamek sekundy), bez konieczności odrzucania całego pliku.
* Format **Monkey's Audio (APE)** również zabezpiecza każdą ramkę sumą CRC, co umożliwia wykrywanie błędów w strukturze pliku.

**2. Globalny cyfrowy odcisk (MD5)**
Kluczowym elementem dla archiwizacji jest globalna weryfikacja zawartości audio.
* **FLAC:** W nagłówku pliku (metadata block) zapisywana jest sygnatura **MD5** obliczona dla **oryginalnych, nieskompresowanych danych audio** (RAW PCM).
    * Dzięki temu, niezależnie od stopnia kompresji czy edycji tagów, dekoder może w dowolnym momencie obliczyć MD5 z odtwarzanego dźwięku i porównać go z sygnaturą w nagłówku. Zgodność tych sum daje 100% pewności, że odtworzony plik jest identyczny z oryginałem co do bitu.
* **APE:** Również wykorzystuje sumy MD5 do weryfikacji całości pliku, jednak w przeciwieństwie do FLAC (gdzie MD5 dotyczy surowego dźwięku), w APE suma ta często dotyczy **zakodowanego strumienia bitów**. Monkey's Audio oferuje dwa tryby weryfikacji: pełną (przez dekodowanie) oraz szybką (sprawdzającą tylko poprawność struktury bitowej bez dekodowania).

>[!info] Wykorzystane źródła:
> Metody kompresji bezstratnej FLAC i APE, praca licencjacka - Dawid Szewczyk (UMCS)
> https://xiph.org/flac/features.html
> https://wiki.hydrogenaudio.org/index.php?title=Monkey%27s_Audio