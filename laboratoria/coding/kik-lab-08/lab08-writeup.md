# Laboratorium 8: Analiza struktury i nagłówków plików graficznych
## Opracowanie zestawu zadań (część teoretyczna)
### Kacper Bednarczuk

---
### Zadanie 1.1: Magiczne liczby (identyfikacja plików)

Zadanie polegało na identyfikacji typów plików graficznych na podstawie ich nagłówków (sygnatur szesnastkowych), pomijając rozszerzenia plików. Do analizy wykorzystano edytor szesnastkowy [hexed.it](https://hexed.it/).

Poniższa tabela przedstawia zidentyfikowane sygnatury dla przygotowanych próbek (identyczny obrazek zapisany w czterech różnych formatach):

| Format pliku | Rozszerzenie | Odczytana sygnatura (HEX) | Interpretacja ASCII / Opis |
| :--- | :--- | :--- | :--- |
| **BMP** | `.bmp` | `42 4D` | `BM` (Bitmap) |
| **PNG** | `.png` | `89 50 4E 47 0D 0A 1A 0A` | `.PNG....` |
| **GIF** | `.gif` | `47 49 46 38 39 61` | `GIF89a` |
| **JPEG** | `.jpg` | `FF D8` | Start of Image (SOI) |

**Próbka poddana analizie:**
![[sample.png]]

---
### Zadanie 1.2 i 1.3: Anatomia nagłówków i ręczna ekstrakcja danych

Przeprowadzono ręczną ekstrakcję kluczowych metadanych (wymiary, głębia kolorów) bezpośrednio z kodu binarnego plików BMP oraz PNG, uwzględniając różnice w kolejności bajtów (Endianness).

#### 1. Plik BMP (Little-Endian)
Format BMP przechowuje liczby w konwencji **Little-Endian** (od najmniej znaczącego bajtu). Oznacza to, że bajty należy odczytywać w odwrotnej kolejności przed dokonaniem konwersji na system dziesiętny.

* **Szerokość obrazu** (Offset `0x12`):
    * Odczytane bajty: `32 00 00 00`
    * Po odwróceniu (Little-Endian): `00 00 00 32`
    * Obliczenia: $3 \cdot 16^1 + 2 \cdot 16^0 = 48 + 2 =$ **50 pikseli**.
* **Wysokość obrazu** (Offset `0x16`):
    * Odczytane bajty: `32 00 00 00`
    * Po odwróceniu (Little-Endian): `00 00 00 32`
    * Obliczenia: $3 \cdot 16^1 + 2 \cdot 16^0 = 48 + 2 =$ **50 pikseli**.
* **Głębia bitowa** (Offset `0x1C`):
    * Odczytane bajty: `18 00`
    * Po odwróceniu (Little-Endian): `00 18`
    * Obliczenia: $1 \cdot 16^1 + 8 \cdot 16^0 = 16 + 8 =$ **24 bity** (True Color).

#### 2. Plik PNG (Big-Endian)
Format PNG używa konwencji **Big-Endian**, co jest bardziej intuicyjne dla człowieka (czytamy od lewej do prawej). Kluczowe dane znajdują się w pierwszym chunku `IHDR`.

* **Szerokość obrazu** (Offset `0x10`):
    * Odczytane bajty: `00 00 00 32`
    * Obliczenia: $3 \cdot 16^1 + 2 \cdot 16^0 = 48 + 2 =$ **50 pikseli**.
* **Wysokość obrazu** (Offset `0x14`):
    * Odczytane bajty: `00 00 00 32`
    * Obliczenia: $3 \cdot 16^1 + 2 \cdot 16^0 = 48 + 2 =$ **50 pikseli**.

**Wniosek:** Mimo że oba pliki reprezentują ten sam obraz o wymiarach 50x50 pikseli, sposób zapisu wartości liczbowych w ich nagłówkach jest różny ze względu na przyjętą kolejność bajtów (Little vs Big Endian).

---
### Zadanie 1.4: Inspekcja metadanych EXIF

Analizie poddano zdjęcie wykonane aparatem cyfrowym w formacie JPEG. Metadane EXIF (Exchangeable Image File Format) pozwoliły na odczytanie parametrów sprzętowych oraz ustawień ekspozycji.

**Odczytane dane:**
1.  **Model aparatu:** Canon EOS 350D DIGITAL
2.  **Oprogramowanie:** Adobe Photoshop 22.3 (Windows)
3.  **Wartość ISO:** ISO-200
4.  **Wersja EXIF:** 0221
5.  **Ogniskowa:** 50 mm

#### Analiza zagrożeń prywatności
Publiczne udostępnianie zdjęć z nieusuniętymi metadanymi EXIF niesie ze sobą istotne ryzyko. Największym zagrożeniem są **dane geolokalizacyjne (GPS)**, które często są automatycznie zapisywane przez smartfony. Pozwalają one na precyzyjne określenie miejsca wykonania zdjęcia, co może ujawnić adres zamieszkania użytkownika, miejsce pracy lub aktualne miejsce pobytu (np. podczas wakacji).

Warto zauważyć, że większość popularnych serwisów społecznościowych i komunikatorów (np. WhatsApp, Threema, Slack) **automatycznie usuwa metadane EXIF** podczas przesyłania zdjęć. Jest to mechanizm bezpieczeństwa mający na celu ochronę prywatności użytkowników przed nieświadomym ujawnieniem wrażliwych danych.