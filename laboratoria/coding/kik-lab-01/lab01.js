// ===== CZĘŚĆ 1: SŁOWNIKI KODOWANIA =====

// Słownik Morse'a (litery A-Z i cyfry 0-9)
const morseDict = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

// Słownik Braille'a (litery A-Z i cyfry 0-9)
// Układ punktów:
// 1 • • 4
// 2 • • 5
// 3 • • 6
const brailleDict = {
  // Litery A-Z
  A: [true, false, false, false, false, false],
  B: [true, true, false, false, false, false],
  C: [true, false, false, true, false, false],
  D: [true, false, false, true, true, false],
  E: [true, false, false, false, true, false],
  F: [true, true, false, true, false, false],
  G: [true, true, false, true, true, false],
  H: [true, true, false, false, true, false],
  I: [false, true, false, true, false, false],
  J: [false, true, false, true, true, false],
  K: [true, false, true, false, false, false],
  L: [true, true, true, false, false, false],
  M: [true, false, true, true, false, false],
  N: [true, false, true, true, true, false],
  O: [true, false, true, false, true, false],
  P: [true, true, true, true, false, false],
  Q: [true, true, true, true, true, false],
  R: [true, true, true, false, true, false],
  S: [false, true, true, true, false, false],
  T: [false, true, true, true, true, false],
  U: [true, false, true, false, false, true],
  V: [true, true, true, false, false, true],
  W: [false, true, false, true, true, true],
  X: [true, false, true, true, false, true],
  Y: [true, false, true, true, true, true],
  Z: [true, false, true, false, true, true],
  // Cyfry 0-9 (używają tych samych wzorów co litery A-J)
  0: [false, true, false, true, true, false], // J
  1: [true, false, false, false, false, false], // A
  2: [true, true, false, false, false, false], // B
  3: [true, false, false, true, false, false], // C
  4: [true, false, false, true, true, false], // D
  5: [true, false, false, false, true, false], // E
  6: [true, true, false, true, false, false], // F
  7: [true, true, false, true, true, false], // G
  8: [true, true, false, false, true, false], // H
  9: [false, true, false, true, false, false], // I
};

// Znak poprzedzający cyfry w Braille'u
const brailleNumberSign = [false, false, true, true, true, true];

// ===== CZĘŚĆ 2: FUNKCJE KODOWANIA/DEKODOWANIA =====

function encodeToMorse(plainText) {
  const words = plainText.toUpperCase().split(" ");
  const encodedWords = [];

  for (const word of words) {
    const encodedChars = [];
    for (const char of word) {
      if (morseDict[char]) {
        encodedChars.push(morseDict[char]);
      }
    }
    encodedWords.push(encodedChars.join(" "));
  }

  return encodedWords.join(" / "); // Taki sam separator, jak w tłumaczu podanym na WK
}

function decodeFromMorse(morseCode) {
  // Odwrócony słownik Morse'a (kod -> litera)
  const reverseMorseDict = {};
  for (const [char, code] of Object.entries(morseDict)) {
    reverseMorseDict[code] = char;
  }

  const words = morseCode.split(" / "); // Separator słów
  const decodedWords = [];

  for (const word of words) {
    const chars = word.split(" "); // Separator znaków
    let decodedWord = "";
    for (const code of chars) {
      if (code && reverseMorseDict[code]) {
        decodedWord += reverseMorseDict[code];
      }
    }
    decodedWords.push(decodedWord);
  }

  return decodedWords.join(" ");
}

function encodeToBraille(plainText) {
  const result = [];
  const text = plainText.toUpperCase();
  let inNumberMode = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === " ") {
      // Spacja kończy tryb liczby
      inNumberMode = false;
      result.push([false, false, false, false, false, false]); // Pusta cela dla spacji
      continue;
    }

    const isDigit = /[0-9]/.test(char);

    // Jeśli zaczyna się sekwencja cyfr, dodaj znak liczby
    if (isDigit && !inNumberMode) {
      result.push([...brailleNumberSign]);
      inNumberMode = true;
    }

    // Jeśli kończy się sekwencja cyfr (litera po cyfrze)
    if (!isDigit && inNumberMode) {
      inNumberMode = false;
    }

    if (brailleDict[char]) {
      result.push([...brailleDict[char]]);
    }
  }

  return result;
}

function decodeFromBraille(brailleCode) {
  // Pomocnicza funkcja do porównywania cel
  const cellsEqual = (cell1, cell2) => {
    if (cell1.length !== cell2.length) return false;
    for (let i = 0; i < cell1.length; i++) {
      if (cell1[i] !== cell2[i]) return false;
    }
    return true;
  };

  // Odwrócony słownik Braille'a (dla liter)
  const reverseBrailleDict = {};
  for (const [char, pattern] of Object.entries(brailleDict)) {
    if (/[A-Z]/.test(char)) {
      // Tylko litery
      reverseBrailleDict[pattern.join(",")] = char;
    }
  }

  let result = "";
  let inNumberMode = false;

  for (let i = 0; i < brailleCode.length; i++) {
    const cell = brailleCode[i];

    // Sprawdź czy to znak liczby
    if (cellsEqual(cell, brailleNumberSign)) {
      inNumberMode = true;
      continue;
    }

    // Sprawdź czy to spacja (pusta cela)
    if (cell.every((dot) => !dot)) {
      result += " ";
      inNumberMode = false;
      continue;
    }

    const key = cell.join(",");

    if (inNumberMode) {
      // Dekoduj jako cyfrę
      for (const [char, pattern] of Object.entries(brailleDict)) {
        if (/[0-9]/.test(char) && cellsEqual(cell, pattern)) {
          result += char;
          break;
        }
      }
    } else {
      // Dekoduj jako literę
      if (reverseBrailleDict[key]) {
        result += reverseBrailleDict[key];
      }
    }
  }

  return result;
}

// ===== CZĘŚĆ 3: ANALIZA WERYFIKACYJNA =====

function analyseBraille(brailleCode) {
  if (brailleCode.length === 0) {
    return {
      averageHammingWeight: 0,
      percentageHighComplexity: 0,
    };
  }

  let totalWeight = 0;
  let highComplexityCount = 0;

  for (const cell of brailleCode) {
    // Oblicz wagę Hamminga (liczba True/zapalonych punktów)
    const weight = cell.filter((dot) => dot === true).length;
    totalWeight += weight;

    // Sprawdź czy używa 5 lub 6 punktów
    if (weight >= 5) {
      highComplexityCount++;
    }
  }

  const averageHammingWeight = totalWeight / brailleCode.length;
  const percentageHighComplexity =
    (highComplexityCount / brailleCode.length) * 100;

  return {
    averageHammingWeight: averageHammingWeight,
    percentageHighComplexity: percentageHighComplexity,
  };
}

// ===== TESTY =====

console.log("===== TEST MORSE =====");
const testText1 = "QWERTY 123";
const morse = encodeToMorse(testText1);
console.log("Tekst:", testText1);
console.log("Morse:", morse);
console.log("Dekodowany:", decodeFromMorse(morse));
console.log();

console.log("===== TEST BRAILLE =====");
const testText2 = "QWERTY 123";
const braille = encodeToBraille(testText2);
console.log("Tekst:", testText2);
console.log("Braille:");
for (let i = 0; i < braille.length; i++) {
  console.log(`  Cela ${i + 1}:`, braille[i]);
}
console.log("Dekodowany:", decodeFromBraille(braille));
console.log();

console.log("===== ANALIZA BRAILLE =====");
const analysis = analyseBraille(braille);
console.log("Wszystkie cele:");
braille.forEach((cell, i) => {
  const weight = cell.filter((d) => d).length;
  console.log(`${i + 1}. ${cell} -> waga: ${weight}`);
});
console.log("Średnia waga Hamminga:", analysis.averageHammingWeight.toFixed(2));
console.log(
  "Procent cel o wysokiej złożoności (5-6 punktów):",
  analysis.percentageHighComplexity.toFixed(2) + "%"
);
console.log();
