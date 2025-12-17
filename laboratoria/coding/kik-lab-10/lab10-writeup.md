# Laboratorium 10: Współczesne standardy transmisji danych
## Opracowanie zestawu zadań (część opisowa i obliczeniowa)
### Kacper Bednarczuk

---
#### Część 1: Analiza technologii i standardów (opisowa)
##### Zadanie 1.1: Ewolucja Ethernetu i okablowania strukturalnego

**1. Miedź (Skrętka)**

Poniższa tabela przedstawia porównanie współczesnych standardów okablowania miedzianego.

| Kategoria  | Częstotliwość (MHz) | Max. Prędkość (na 100m) | Ekranowanie (Zazwyczaj) | Zastosowanie dziś                                    |
| :--------- | :------------------ | :---------------------- | :---------------------- | :--------------------------------------------------- |
| **Cat 5e** | 100 MHz             | 1 Gbps                  | U/UTP (brak)            | Dom / Biuro (podstawowe)                             |
| **Cat 6A** | 500 MHz             | 10 Gbps                 | S/FTP lub F/UTP         | Centra danych, budynki komercyjne (wymagające 10GbE) |
| **Cat 8**  | 2000 MHz            | 25/40 Gbps (na 30m)     | Pełne ekranowanie       | Centra danych, aplikacje o wysokiej przepustowości   |

>[!info] Wykorzystane źródło:
> https://www.fs.com/eu-en/blog/cat55e-cat66a-cat7-and-cat8-cable-buying-guide-2651.html

**2. Światłowód**

**Fundamentalna różnica między SMF a MMF:**
Różnica wynika przede wszystkim z budowy rdzenia i sposobu propagacji światła.
*   **Światłowód jednomodowy (SMF - Single Mode Fiber):** Posiada bardzo małą średnicę rdzenia (typowo 9 µm), co pozwala na propagację tylko jednego modu światła (promienia) jednocześnie. Dzięki temu sygnał nie ulega wielokrotnym odbiciom, co minimalizuje tłumienie i eliminuje dyspersję modową. Jako źródła światła wykorzystuje lasery lub diody laserowe.
*   **Światłowód wielomodowy (MMF - Multimode Fiber):** Posiada znacznie szerszy rdzeń (typowo 50 µm lub 62.5 µm), co umożliwia propagację wielu modów światła jednocześnie. Jest on podatny na zjawisko dyspersji modowej, co ogranicza jego zasięg i pasmo. Jako źródła światła wykorzystuje tańsze diody LED lub lasery VCSEL.

**Odpowiedzi na pytania:**

- **Który z nich zastosujesz do połączenia dwóch budynków oddalonych o 5 km?**
Zastosuję **światłowód jednomodowy (SMF)**. Jest on przeznaczony do aplikacji długodystansowych i bez problemu obsługuje transmisję na dystansie 5 km (standardowo do 10 km dla 1G/10G, a nawet więcej), podczas gdy zasięg światłowodów wielomodowych dla szybkich sieci ograniczony jest zazwyczaj do kilkuset metrów (np. 300-400 m dla OM3/OM4).

- **Który z nich jest tańszy w implementacji na krótkich dystansach (np. w serwerowni)?**
Tańszy w implementacji jest **światłowód wielomodowy (MMF)**. Chociaż sam kabel MMF może być droższy od SMF, to całkowity koszt systemu jest niższy ze względu na znacznie tańsze urządzenia nadawczo-odbiorcze (transceivery). Optyka dla MMF wykorzystuje tańsze źródła światła (VCSEL), podczas gdy optyka SMF wymaga precyzyjnych laserów, co sprawia, że transceivery wielomodowe są 2-3 razy tańsze od jednomodowych.

>[!info] Wykorzystane źródło:
> https://www.fs.com/blog/fiber-optic-cable-types-single-mode-vs-multimode-fiber-cable-1310.html

---
##### Zadanie 1.2: Rewolucja bezprzewodowa (Wi-Fi)

**1. Wi-Fi 6 (802.11ax) vs Wi-Fi 6E**
Kluczowa różnica sprzętowa polega na dostępie do widma radiowego.
*   **Wi-Fi 6:** Obsługuje tradycyjne pasma **2.4 GHz oraz 5 GHz**.
*   **Wi-Fi 6E:** Jest rozszerzeniem standardu, które wprowadza obsługę **pasma 6 GHz**. Aby z niego skorzystać, wymagane są nowe urządzenia sprzętowo przystosowane do obsługi tej częstotliwości.

**2. Wi-Fi 7 (802.11be)**
**Przełomowe technologie:**
1.  **Kanały o szerokości 320 MHz:** Standard ten podwaja maksymalną szerokość kanału (z 160 MHz w Wi-Fi 6/6E do 320 MHz w paśmie 6 GHz), co przekłada się na znacznie wyższą przepustowość.
2.  **Modulacja 4K-QAM (4096-QAM):** Zwiększenie gęstości modulacji względem 1024-QAM w Wi-Fi 6 pozwala na przesłanie o 20% więcej danych teoretycznych w tym samym czasie.

**MLO (Multi-Link Operation):**
Jest to technologia pozwalająca urządzeniom na **jednoczesne połączenie przez wiele pasm częstotliwości** (agregację kanałów z różnych pasm, np. 5 GHz i 6 GHz).
*   **Wpływ na stabilność:** MLO drastycznie redukuje opóźnienia i zwiększa niezawodność, ponieważ urządzenie może dynamicznie przesyłać dane tym pasmem, które w danej chwili jest mniej obciążone, eliminując problem buforowania i zatorów.

**3. Zatłoczenie pasma (6 GHz vs 2.4 GHz)**
Pasmo 6 GHz jest uważane za "autostradę" w porównaniu do 2.4 GHz z kilku powodów:
*   **Pojemność:** Pasmo 6 GHz oferuje ogromną ilość nowego widma, co pozwala na utworzenie wielu szerokich, nienakładających się kanałów, podczas gdy pasmo 2.4 GHz ma ich bardzo niewiele.
*   **Zakłócenia:** Pasmo 2.4 GHz jest "zaśmiecone" przez starsze urządzenia i inne technologie, natomiast pasmo 6 GHz jest wolne od interferencji mikrofalowych i zapewnia "czystą" transmisję, co jest kluczowe w gęsto zaludnionych obszarach (np. bloki mieszkalne).

>[!info] Wykorzystane źródło:
> https://www.fs.com/blog/wifi-6-vs-wifi-6e-vs-wifi-7-how-to-choose-36.html

---
##### Zadanie 1.3: Uniwersalizacja interfejsów (USB i Thunderbolt)

**1. Złącze vs Protokół**
*   **Różnica:** USB-C to jedynie fizyczny typ **złącza** (wtyczki i gniazda), natomiast USB 3.2 czy USB4 to **standardy transmisji** (protokoły) określające prędkość przesyłu danych, sposób zarządzania energią i obsługiwane funkcje. Urządzenia z portem USB-C mogą obsługiwać różne standardy, od powolnego USB 2.0 po najszybszy Thunderbolt 4.
*   **Kable:** Nie, **nie każdy kabel USB-C obsłuży prędkość 40 Gbps**. Standard USB4 przewiduje dwie prędkości: 20 Gbps oraz 40 Gbps. Tańsze kable lub te dłuższe (powyżej 1 metra dla kabli pasywnych) mogą ograniczać prędkość do 20 Gbps. Aby uzyskać pełne 40 Gbps, wymagany jest certyfikowany kabel oznaczony odpowiednim logo (np. liczbą 40 lub błyskawicą z liczbą 4).

**2. Thunderbolt 4**
Aby port otrzymał certyfikat Thunderbolt 4, musi spełniać bardziej rygorystyczne wymagania minimalne niż standard USB4:
*   **Dane:** Minimalna gwarantowana przepustowość dla danych PCIe to **32 Gbps** (w USB4 minimum to często 20 Gbps dla całego łącza).
*   **Wideo:** Obsługa **dwóch monitorów 4K** przy 60Hz lub jednego monitora 8K (USB4 nie ma wymogu obsługi dwóch monitorów).
*   **Zasilanie:** Port musi zapewniać co najmniej **15 W** mocy do ładowania akcesoriów (dla USB4 minimum to 7.5 W).
*   **Inne:** Wymagana jest ochrona DMA (Direct Memory Access) przed atakami na pamięć.
*   **Różnica względem USB4:** USB4 jest w dużej mierze oparty na protokole Thunderbolt, ale jego specyfikacja jest luźniejsza. USB4 *może* oferować parametry zbliżone do Thunderbolt 4 (np. 40 Gbps), ale producenci mogą stosować tańsze warianty (20 Gbps, brak obsługi dwóch ekranów), podczas gdy Thunderbolt 4 gwarantuje najwyższe parametry w każdym certyfikowanym urządzeniu.

>[!info] Wykorzystane źródło:
> https://www.tomsguide.com/features/thunderbolt-4-vs-usb4-whats-the-difference

**3. Power Delivery (PD)**
*   **Negocjacja:** Protokół USB-PD polega na **inteligentnej komunikacji** (negocjacji) między źródłem zasilania (ładowarką) a urządzeniem pobierającym energię. Ustalają one optymalne napięcie i natężenie prądu, które urządzenie jest w stanie przyjąć, a ładowarka dostarczyć. Zasilanie nie jest "sztywne" – może być dynamicznie dostosowywane.
*   **Maksymalna moc (PD 3.1):** Najnowsza specyfikacja PD 3.1, wprowadzająca standard EPR (Extended Power Range), pozwala na przesyłanie mocy do **240 W**.
    *   Jest to osiągane przez podniesienie napięcia do **48 V** przy natężeniu 5 A (wcześniejszy limit w PD 3.0 wynosił 100 W przy 20 V). Pozwala to na zasilanie przez USB-C nawet wydajnych laptopów gamingowych czy monitorów 4K.

>[!info] Wykorzystane źródło:
> https://satechi.net/blogs/pd-3-1-protocol-everything-you-need-to-know

---
#### Część 2: Obliczenia transferów (praktyczna)
##### Zadanie 2.1: Teoria vs rzeczywistość

Celem zadania jest porównanie czasu przesyłu pliku o rozmiarze **100 GB** przez różne media transmisyjne.
Do obliczeń przyjmujemy system dziesiętny (SI) dla uproszczenia konwersji jednostek prędkości sieciowych:
* Rozmiar danych: $$S = 100 \text{ GB} = 100 \ 000 \text{ MB}$$
* Rozmiar w bitach: $$S_{b} = 100 \cdot 8 \cdot 10^9 \text{ b} = 800 \text{ Gb} = 800 \ 000 \text{ Mb}$$

**Wyniki obliczeń:**

**1. Łącze internetowe (600 Mbps)**
$$t = \frac{800 \ 000 \text{ Mb}}{600 \text{ Mbps}} \approx 1333,33 \text{ s}$$
Czas: **~22 min 13 s**

**2. Sieć LAN (Gigabit Ethernet - 1 Gbps)**
$$t = \frac{800 \text{ Gb}}{1 \text{ Gbps}} = 800 \text{ s}$$
Czas: **13 min 20 s**

**3. USB 2.0 (480 Mbps)**
$$t = \frac{800 \ 000 \text{ Mb}}{480 \text{ Mbps}} \approx 1666,67 \text{ s}$$
Czas: **~27 min 47 s**

**4. Dysk SSD NVMe (5000 MB/s)**
Tu jednostki są zgodne (Bajty), więc nie konwertujemy na bity.
$$t = \frac{100 \ 000 \text{ MB}}{5000 \text{ MB/s}} = 20 \text{ s}$$
Czas: **20 s**

---
##### Zadanie 2.2: Narzut protokołu (Overhead)

Standard Gigabit Ethernet (1 Gbps) posiada teoretyczną przepustowość wynikającą z przeliczenia bitów na bajty:
$$V_{teoria} = \frac{1000 \text{ Mbps}}{8} = 125 \text{ MB/s}$$

W zadaniu przyjmujemy realną przepustowość efektywną:
$$V_{real} = 115 \text{ MB/s}$$

**1. Rzeczywisty czas przesyłu (dla 100 GB)**
Obliczamy czas dla realnej prędkości transferu:
$$t_{real} = \frac{100 \ 000 \text{ MB}}{115 \text{ MB/s}} \approx 869,56 \text{ s}$$
Czas rzeczywisty: **~14 min 30 s**
*(W porównaniu do teoretycznych 13 min 20 s obliczonych w zadaniu 2.1)*

**2. Procentowa strata wydajności**
Narzut (overhead) obliczamy jako stosunek różnicy prędkości do prędkości teoretycznej.

$$\text{Strata} = \frac{V_{teoria} - V_{real}}{V_{teoria}} \cdot 100\%$$

$$\text{Strata} = \frac{125 - 115}{125} \times 100\% = \frac{10}{125} \cdot 100\%$$

Wynik: **8%**
Oznacza to, że 8% pasma jest zużywane na nagłówki protokołów (Ethernet, IP, TCP), sumy kontrolne oraz kodowanie linii, a nie na przesył właściwych danych użytkownika.