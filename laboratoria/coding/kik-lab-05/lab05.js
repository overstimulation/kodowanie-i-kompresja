function isUniquelyDecodable(codewords) {
  // Zamiana tablicy na zbiór dla łatwego sprawdzania przynależności
  const C = new Set(codewords);
  const S = new Set();

  // Funkcja pomocnicza: sprawdza czy str1 jest prefiksem str2
  function isPrefix(prefix, str) {
    return str.startsWith(prefix) && str !== prefix;
  }

  // Krok 1: Generowanie początkowych sufiksów z par słów kodowych
  for (const ci of C) {
    for (const cj of C) {
      if (isPrefix(ci, cj)) {
        // Pobiera sufiks napisu cj, zaczynając od pozycji ci.length
        const suffix = cj.slice(ci.length);
        // Jeśli sufiks jest słowem kodowym, kod nie jest UD
        if (C.has(suffix)) {
          return {
            isUD: false,
            reason: `Sufiks '${suffix}' jest słowem kodowym`,
          };
        }
        S.add(suffix);
      }
    }
  }

  // Jeśli nie ma żadnych sufiksów, kod jest prefiksowy (a więc UD)
  if (S.size === 0) {
    return {
      isUD: true,
      reason: "Kod prefiksowy",
    };
  }

  // Iteracyjne generowanie nowych sufiksów
  let previousSize = 0;
  while (S.size > previousSize) {
    previousSize = S.size;
    const newSuffixes = new Set();

    // Sprawdzamy wszystkie pary: sufiks vs słowo kodowe
    for (const s of S) {
      for (const c of C) {
        // Przypadek 1: sufiks jest prefiksem słowa kodowego
        if (isPrefix(s, c)) {
          const newSuffix = c.slice(s.length);
          if (C.has(newSuffix)) {
            return {
              isUD: false,
              reason: `Sufiks '${newSuffix}' jest słowem kodowym`,
            };
          }
          newSuffixes.add(newSuffix);
        }

        // Przypadek 2: słowo kodowe jest prefiksem sufiksu
        if (isPrefix(c, s)) {
          const newSuffix = s.slice(c.length);
          if (C.has(newSuffix)) {
            return {
              isUD: false,
              reason: `Sufiks '${newSuffix}' jest słowem kodowym`,
            };
          }
          newSuffixes.add(newSuffix);
        }
      }
    }

    // Dodajemy nowe sufiksy do zbioru S
    for (const suffix of newSuffixes) {
      S.add(suffix);
    }
  }

  // Osiągnięto punkt stały - kod jest UD
  return {
    isUD: true,
    reason: "Osiągnięto punkt stały bez konfliktów",
  };
}

function testCode(name, codewords) {
  console.log(`\n=== Test: ${name} ===`);
  console.log(`Słowa kodowe: {${codewords.join(", ")}}`);

  const result = isUniquelyDecodable(codewords);

  if (result.isUD) {
    console.log(`✓ Kod JEDNOZNACZNIE DEKODOWALNY`);
    console.log(`  Powód: ${result.reason}`);
  } else {
    console.log(`✗ Kod NIE JEST JEDNOZNACZNIE DEKODOWALNY`);
    console.log(`  Powód: ${result.reason}`);
  }
}

console.log("WERYFIKACJA KODÓW Z ZADANIA 1.1");
testCode("Kod A", ["1", "01", "001", "000"]);
testCode("Kod B", ["00", "11", "010"]);
testCode("Kod C", ["1", "10", "001", "011"]);
console.log("\nWERYFIKACJA KODÓW Z ZADANIA 1.2");
testCode('Kod B + "01"', ["00", "11", "010", "01"]);
testCode('Kod B + "110"', ["00", "11", "010", "110"]);
testCode('Kod B + "011"', ["00", "11", "010", "011"]);
