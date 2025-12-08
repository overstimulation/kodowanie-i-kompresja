#include <stdio.h>

struct Student {
    char initial;       // 1 bajt
    // Padding: 3 bajty (wyrównanie inta do adresu podzielnego przez 4)
    int studentId;      // 4 bajty
    short age;          // 2 bajty
    // Padding: 2 bajty (wyrównanie całej struktury do wielokrotności 4)
};

struct StudentOptimised {
    char initial;       // 1 bajt
    // Padding: 1 bajt (wyrównanie shorta do adresu podzielnego przez 2)
    short age;          // 2 bajty
    int studentId;      // 4 bajty
    // Brak paddingu na końcu (rozmiar 8 jest wielokrotnością 4)
};

void checkEndianness() {
    printf("=== Zadanie 2.1: Endianness ===\n");
    unsigned int value = 0x11223344;
    // Rzutowanie wskaźnika, aby dobrać się do pojedynczych bajtów
    unsigned char *ptr = (unsigned char*)&value;

    printf("Wartość hex: 0x%X\n", value);
    for (int i = 0; i < 4; i++) {
        printf("Bajt %d: 0x%02X\n", i, ptr[i]);
    }

    // Sprawdzenie pierwszego bajtu (pod najniższym adresem)
    if (ptr[0] == 0x44) {
        printf("Wniosek: Twój system to Little-Endian\n");
    } else if (ptr[0] == 0x11) {
        printf("Wniosek: Twój system to Big-Endian\n");
    } else {
        printf("Wniosek: Inny/Nieznany układ\n");
    }
    printf("\n");
}

void checkAllocationDirection() {
    printf("=== Zadanie 2.2: Kierunek alokacji na stosie ===\n");
    int variableA;
    int variableB;

    printf("Adres zmiennej A: %p\n", (void*)&variableA);
    printf("Adres zmiennej B: %p\n", (void*)&variableB);

    // Porównanie adresów
    if (&variableA > &variableB) {
        printf("Wniosek: Nowe zmienne otrzymują NIŻSZE adresy. (Alokacja postępuje w stronę adresu 0).\n");
    } else {
        printf("Wniosek: Nowe zmienne otrzymują WYŻSZE adresy. (Alokacja postępuje w stronę maksymalnego adresu).\n");
    }
    printf("\n");
}

void checkStructPadding() {
    printf("=== Zadanie 2.3: Struktury i Padding ===\n");
    
    printf("Rozmiar struct Student: %zu bajtów\n", sizeof(struct Student));
    printf("Rozmiar struct StudentOptimised: %zu bajtów\n", sizeof(struct StudentOptimised));

    size_t savedBytes = sizeof(struct Student) - sizeof(struct StudentOptimised);
    printf("Zaoszczędzono: %zu bajtów\n", savedBytes);
    printf("\n");
}

int main() {
    checkEndianness();
    checkAllocationDirection();
    checkStructPadding();
    
    return 0;
}