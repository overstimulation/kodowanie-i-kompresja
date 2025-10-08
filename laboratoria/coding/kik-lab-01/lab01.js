const morseCodeDictionary = {
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

const brailleCodeDictionary = {
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
  0: [false, true, false, true, true, false],
  1: [true, false, false, false, false, false],
  2: [true, true, false, false, false, false],
  3: [true, false, false, true, false, false],
  4: [true, false, false, true, true, false],
  5: [true, false, false, false, true, false],
  6: [true, true, false, true, false, false],
  7: [true, true, false, true, true, false],
  8: [true, true, false, false, true, false],
  9: [false, true, false, true, false, false],
};

// console.log("Słownik Morse'a:", morseCodeDictionary);
// console.log("Słownik Braille'a:", brailleCodeDictionary);

const reverseMorseCodeDictionary = Object.fromEntries(
  Object.entries(morseCodeDictionary).map(([key, value]) => [value, key])
);
const reverseBrailleCodeDictionary = Object.fromEntries(
  Object.entries(brailleCodeDictionary).map(([key, value]) => [
    value.toString(),
    key,
  ])
);

function encode_to_morse(plain_text) {
  return plain_text
    .toUpperCase()
    .split(" ")
    .map((word) => {
      return word
        .split("")
        .map((char) => morseCodeDictionary[char] || "")
        .join(" ");
    })
    .join("   ");
}

function decode_from_morse(morse_code) {
  return morse_code
    .split("   ")
    .map((word) => {
      return word
        .split(" ")
        .map((code) => reverseMorseCodeDictionary[code] || "")
        .join("");
    })
    .join(" ");
}

function encode_to_braille(plain_text) {
  const brailleResult = [];
  let isNumberSequence = false;
  const numberSign = [false, false, true, true, true, true];

  for (const char of plain_text.toUpperCase()) {
    const isDigit = !isNaN(parseInt(char));

    if (isDigit && !isNumberSequence) {
      brailleResult.push(numberSign);
      isNumberSequence = true;
    } else if (!isDigit && isNumberSequence) {
      isNumberSequence = false;
    }

    if (char === " ") {
      brailleResult.push([false, false, false, false, false, false]); // Space in Braille
      isNumberSequence = false;
    } else if (brailleCodeDictionary[char]) {
      brailleResult.push(brailleCodeDictionary[char]);
    }
  }
  return brailleResult;
}

function decode_from_braille(braille_code) {
  let plain_text = "";
  let isNumberSequence = false;
  const numberSign = [false, false, true, true, true, true];
  const brailleDigits = {
    [brailleCodeDictionary["A"].toString()]: "1",
    [brailleCodeDictionary["B"].toString()]: "2",
    [brailleCodeDictionary["C"].toString()]: "3",
    [brailleCodeDictionary["D"].toString()]: "4",
    [brailleCodeDictionary["E"].toString()]: "5",
    [brailleCodeDictionary["F"].toString()]: "6",
    [brailleCodeDictionary["G"].toString()]: "7",
    [brailleCodeDictionary["H"].toString()]: "8",
    [brailleCodeDictionary["I"].toString()]: "9",
    [brailleCodeDictionary["J"].toString()]: "0",
  };

  for (const cell of braille_code) {
    if (cell.toString() === numberSign.toString()) {
      isNumberSequence = true;
      continue;
    }

    if (cell.every((p) => !p)) {
      // Space
      plain_text += " ";
      isNumberSequence = false;
      continue;
    }

    if (isNumberSequence) {
      const digit = brailleDigits[cell.toString()];
      if (digit) {
        plain_text += digit;
      } else {
        // If a non-digit character is found, the number sequence ends
        isNumberSequence = false;
        const char = reverseBrailleCodeDictionary[cell.toString()];
        if (char) plain_text += char;
      }
    } else {
      const char = reverseBrailleCodeDictionary[cell.toString()];
      if (char) plain_text += char;
    }
  }
  return plain_text;
}

function analyse_braille_code(braille_code) {
  if (!braille_code || braille_code.length === 0) {
    return {
      average_hamming_weight: 0,
      percentage_of_complex_cells: 0,
    };
  }

  let total_hamming_weight = 0;
  let complex_cells_count = 0;

  for (const cell of braille_code) {
    const hamming_weight = cell.filter((point) => point).length;
    total_hamming_weight += hamming_weight;

    if (hamming_weight >= 5) {
      complex_cells_count++;
    }
  }

  const average_hamming_weight = total_hamming_weight / braille_code.length;
  const percentage_of_complex_cells =
    (complex_cells_count / braille_code.length) * 100;

  return {
    average_hamming_weight,
    percentage_of_complex_cells,
  };
}

// Example usage:
const example_text = "Hello World 123";
console.log("Original text:", example_text);

// Morse
const morse_encoded = encode_to_morse(example_text);
console.log("Encoded to Morse:", morse_encoded);
const morse_decoded = decode_from_morse(morse_encoded);
console.log("Decoded from Morse:", morse_decoded);

// Braille
const braille_encoded = encode_to_braille(example_text);
console.log("Encoded to Braille:", braille_encoded);
const braille_decoded = decode_from_braille(braille_encoded);
console.log("Decoded from Braille:", braille_decoded);

// Braille Analysis
const braille_analysis = analyse_braille_code(braille_encoded);
console.log("Braille Analysis:", braille_analysis);
