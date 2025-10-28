function decimalToU2(decimal) {
  // Sprawdzenie zakresu dla 8-bitowej liczby U2: [-128, 127]
  if (decimal < -128 || decimal > 127) {
    throw new Error(
      `Liczba ${decimal} jest poza zakresem 8-bitowej liczby U2 [-128, 127]`
    );
  }

  let binary;
  if (decimal >= 0) {
    // Dla liczb dodatnich: zwykła konwersja na binarny
    binary = decimal.toString(2).padStart(8, "0");
  } else {
    // Dla liczb ujemnych: dopełnienie do dwóch
    // 1. Konwersja wartości bezwzględnej na binarny
    // 2. Dopełnienie do 256 (2^8)
    binary = (256 + decimal).toString(2);
  }

  return binary;
}

function u2ToDecimal(binary) {
  // Sprawdzenie czy to liczba ujemna
  if (binary[0] === "1") {
    // Dla liczb ujemnych: odejmujemy 256
    return parseInt(binary, 2) - 256;
  } else {
    // Dla liczb dodatnich: zwykła konwersja
    return parseInt(binary, 2);
  }
}

function binaryAdd(a, b) {
  let result = "";
  let carry = 0;

  // Dodawanie od prawej do lewej (od najmłodszego bitu)
  for (let i = 7; i >= 0; i--) {
    const bitA = parseInt(a[i]);
    const bitB = parseInt(b[i]);

    // Suma trzech bitów: bit z A, bit z B, przeniesienie
    const sum = bitA + bitB + carry;

    // Bit wyniku to sum % 2
    result = (sum % 2) + result;

    // Nowe przeniesienie to sum / 2 (dzielenie całkowite)
    carry = Math.floor(sum / 2);
  }

  return {
    result: result,
    carryOut: carry,
  };
}

function detectOverflow(a, b, result) {
  // Overflow występuje gdy:
  // - suma dwóch liczb dodatnich daje wynik ujemny
  // - suma dwóch liczb ujemnych daje wynik dodatni
  if (a > 0 && b > 0 && result < 0) {
    return true;
  }
  if (a < 0 && b < 0 && result > 0) {
    return true;
  }
  return false;
}

function sumatorU2(a, b) {
  console.log(`\nOperacja w U2 na 8 bitach:`);

  // Krok 1: Konwersja na U2
  const binaryA = decimalToU2(a);
  const binaryB = decimalToU2(b);

  console.log(
    `A = ${a.toString().padStart(4)} (dziesiętnie) -> ${binaryA} (U2)`
  );
  console.log(
    `B = ${b.toString().padStart(4)} (dziesiętnie) -> ${binaryB} (U2)`
  );
  console.log(`---------------------------------------`);

  // Krok 2: Binarne dodawanie
  const addition = binaryAdd(binaryA, binaryB);

  // Wyświetlenie sumy binarnej z carry out
  if (addition.carryOut === 1) {
    console.log(`SUMA BINARNA:           (1)${addition.result}  (C_out = 1)`);
  } else {
    console.log(`SUMA BINARNA:           (0)${addition.result}  (C_out = 0)`);
  }

  // Krok 3: Konwersja wyniku z powrotem na dziesiętny
  const resultDecimal = u2ToDecimal(addition.result);

  console.log(`\nWynik binarny: ${addition.result}`);
  console.log(`Wynik dziesiętny (interpretacja U2): ${resultDecimal}`);

  // Krok 4: Wykrycie nadmiaru
  const overflow = detectOverflow(a, b, resultDecimal);

  if (overflow) {
    console.log(`\n*** WYSTĄPIŁ NADMIAR (OVERFLOW) ***`);
    if (a < 0 && b < 0) {
      console.log(`(Suma dwóch liczb ujemnych dała wynik dodatni)`);
    } else if (a > 0 && b > 0) {
      console.log(`(Suma dwóch liczb dodatnich dała wynik ujemny)`);
    }
  } else {
    console.log(`\n(Brak nadmiaru)`);
  }

  console.log(`\n=======================================\n`);
}

// Przykłady użycia
console.log("\n=== PRZYKŁAD 1: 50 + 80 ===");
sumatorU2(50, 80);

console.log("=== PRZYKŁAD 2: 50 - 30 ===");
sumatorU2(50, -30);

console.log("=== PRZYKŁAD 3: (–30) + (–100) ===");
sumatorU2(-30, -100);

console.log("=== PRZYKŁAD 4: 50 + 30 ===");
sumatorU2(50, 30);
