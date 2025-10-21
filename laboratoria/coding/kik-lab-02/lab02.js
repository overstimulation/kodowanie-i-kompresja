function arabToRoman(number) {
  // W systemie rzymskim można zapisać liczby od 1 do 3999
  if (number < 1 || number > 3999) {
    throw new Error("Liczba musi być w zakresie 1-3999");
  }

  // Mapowanie wartości dziesiętnych na symbole rzymskie
  // Uwzględniamy również notację subtraktywną (4, 9, 40, 90, 400, 900)
  const values = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  let remaining = number;

  // Iterujemy przez wartości od największej do najmniejszej
  for (const { value, symbol } of values) {
    // Ile razy dana wartość mieści się w pozostałej liczbie
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

function validateRoman(romanString) {
  // Sprawdzamy, czy ciąg zawiera tylko dozwolone znaki (case-insensitive)
  if (!/^[IVXLCDM]+$/i.test(romanString)) {
    return false;
  }

  const upper = romanString.toUpperCase();

  // V, L, D nie mogą się powtarzać
  if (/V{2,}|L{2,}|D{2,}/.test(upper)) {
    return false;
  }

  // I, X, C, M mogą się powtarzać maksymalnie 3 razy
  if (/I{4,}|X{4,}|C{4,}|M{4,}/.test(upper)) {
    return false;
  }

  // V, L, D nie mogą być cyframi odejmowanymi
  if (/VX|VL|VC|VD|VM|LC|LD|LM|DM/.test(upper)) {
    return false;
  }

  // I może być użyte tylko przed V i X (nie przed L, C, D, M)
  if (/IL|IC|ID|IM/.test(upper)) {
    return false;
  }

  // X może być użyte tylko przed L i C (nie przed D, M)
  if (/XD|XM/.test(upper)) {
    return false;
  }

  return true;
}

function romanToArab(romanString) {
  // Najpierw walidujemy ciąg
  if (!validateRoman(romanString)) {
    throw new Error("Niepoprawny zapis rzymski");
  }

  const upper = romanString.toUpperCase();

  // Mapowanie symboli rzymskich na wartości (bez notacji subtraktywnej)
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  // Iterujemy przez ciąg
  for (let i = 0; i < upper.length; i++) {
    const current = romanValues[upper[i]];
    const next = romanValues[upper[i + 1]];

    // Zasada subtraktywności: jeśli następna cyfra jest większa, odejmujemy obecną
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}

console.log("=== Konwersja dziesiętny -> rzymski ===");
console.log("2025 ->", arabToRoman(2025));
console.log("777 ->", arabToRoman(777));
console.log("3999 ->", arabToRoman(3999));

console.log("\n=== Konwersja rzymski -> dziesiętny ===");
console.log("MMXXV ->", romanToArab("MMXXV"));
console.log("DCCLXXVII ->", romanToArab("DCCLXXVII"));
console.log("MMMCMXCIX ->", romanToArab("MMMCMXCIX"));

console.log("\n=== Walidacja (poprawne) ===");
console.log("MMXXV ->", validateRoman("MMXXV"));
console.log("DCCLXXVII ->", validateRoman("DCCLXXVII"));
console.log("MMMCMXCIX ->", validateRoman("MMMCMXCIX"));

console.log("\n=== Walidacja (błędne) ===");
console.log("IIII ->", validateRoman("IIII"));
console.log("VV ->", validateRoman("VV"));
console.log("IL ->", validateRoman("IL"));
