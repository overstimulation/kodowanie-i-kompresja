# Laboratorium 7: Grafika komputerowa
## Opracowanie zestawu zadań (część programistyczna)
### Kacper Bednarczuk

---
### Zadanie 2: Praktyka programistyczna - SVG

Celem zadania było ręczne stworzenie pliku wektorowego w formacie SVG, zawierającego podstawowe kształty geometryczne oraz własne elementy dodatkowe.

#### Kod pliku `moj_rysunek.svg`

Poniższy kod definiuje płótno o wymiarach 400x200 pikseli. Zawiera wymagane w instrukcji kształty (prostokąt, koło, linia) oraz dodane przeze mnie elementy autorskie (białe tło, elipsa, trójkąt, tekst).

```xml
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  <rect x="10" y="10" width="100" height="50" fill="red" />
  <circle cx="200" cy="100" r="40" fill="blue" />
  <line x1="250" y1="20" x2="350" y2="180" stroke="green" stroke-width="4" />
  <polygon points="60,160 110,160 85,110" fill="yellow" stroke="black" stroke-width="2" />
  <ellipse cx="340" cy="50" rx="40" ry="20" fill="purple" fill-opacity="0.5" />
  <text x="10" y="190" font-family="Arial" font-size="14" fill="black" font-weight="bold">
    Kacper Bednarczuk
  </text>
</svg>
```