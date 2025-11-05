# Laboratorium 4: Kodowanie znaków w komputerze
## Opracowanie zestawu zadań (część programistyczna)
### Kacper Bednarczuk

---
### Zadanie 2: Zapis i analiza plików

#### Kod programu

```javascript
const fs = require("fs"); // Wbudowany moduł do operacji na systemie plików
const iconv = require("iconv-lite"); // Biblioteka do konwersji kodowań w Node.js

const text = "Język: polski (żółć)";

// 1. Zapis do pliku tekst_utf8.txt (UTF-8)
fs.writeFileSync("tekst_utf8.txt", text, "utf8");
console.log("Zapisano tekst_utf8.txt");

// 2. Zapis do pliku tekst_iso.txt (ISO-8859-2)
const isoBuffer = iconv.encode(text, "iso-8859-2");
fs.writeFileSync("tekst_iso.txt", isoBuffer);
console.log("Zapisano tekst_iso.txt");

// 3. Zapis do pliku tekst_ascii.txt (ASCII)
const asciiBuffer = iconv.encode(text, "ascii"); // Konwersja z zastąpieniem nieobsługiwanych znaków na '?'
fs.writeFileSync("tekst_ascii.txt", asciiBuffer);
console.log("Zapisano tekst_ascii.txt");
```

#### Analiza plików w edytorze HEX

##### `tekst_ascii.txt`
![[lab04-ascii.png]]

##### `tekst_iso.txt`
![[lab04-iso.png]]

##### `tekst_utf8.txt`
![[lab04-utf8.png]]

#### Odpowiedzi na pytania

**1. Jak wygląda zawartość pliku `tekst_ascii.txt`? Co stało się z polskimi znakami?**

Zawartość pliku `tekst_ascii.txt` to `J?zyk: polski (???`. Wszystkie polskie znaki diakrytyczne (`ę`, `ż`, `ó`, `ł`, `ć`) zostały zastąpione znakami zapytania (`?`). Stało się tak, ponieważ kodowanie ASCII nie posiada reprezentacji dla tych znaków, a zastosowany w kodzie moduł zastępuje każdy nieobsługiwany znak znakiem `?`.

**2. Porównaj rozmiar (w bajtach) plików `tekst_iso.txt` i `tekst_utf8.txt`. Który jest większy i dlaczego?**

*   Rozmiar `tekst_iso.txt`: **20 bajtów**
*   Rozmiar `tekst_utf8.txt`: **25 bajtów**

Plik `tekst_utf8.txt` jest większy. Przyczyną jest sposób, w jaki UTF-8 koduje znaki spoza podstawowego zestawu ASCII. W kodowaniu ISO-8859-2 każdy znak (zarówno standardowy, jak i polski) jest reprezentowany przez **jeden bajt**. Natomiast w UTF-8 znaki polskie (`ę`, `ż`, `ó`, `ł`, `ć`) są kodowane za pomocą **dwóch bajtów**. W analizowanym tekście znajduje się 5 polskich znaków, co prowadzi do różnicy w rozmiarze pliku.

**3. Wskaż w widoku HEX pliku `tekst_utf8.txt` sekwencje bajtów odpowiadające znakom `ż`, `ó` i `ł`. Czy zgadzają się one z Twoimi ręcznymi obliczeniami z części 1?**

Tak, sekwencje bajtów zgadzają się z obliczeniami z części teoretycznej:
*   `ż` jest reprezentowane przez sekwencję `C5 BC`.
*   `ó` jest reprezentowane przez sekwencję `C3 B3`.
*   `ł` jest reprezentowane przez sekwencję `C5 82`.

Wszystkie te wartości można odnaleźć w zrzucie ekranu z edytora heksadecymalnego dla pliku `tekst_utf8.txt`.
