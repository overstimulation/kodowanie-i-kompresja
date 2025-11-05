const fs = require("fs"); // Wbudowany moduł do operacji na systemie plików
const iconv = require("iconv-lite"); // Moduł do konwersji kodowań w Node.js

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
