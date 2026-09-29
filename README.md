# Memory

Ein browserbasiertes Memory-Spiel für zwei Spieler. Das Projekt verwendet TypeScript, SCSS und Vite.

## Funktionen

- Zwei Themes: Code Vibes und Gaming
- Zwei Spieler mit wählbarer Startfarbe und Punktestand
- Drei Spielfeldgrößen: 16, 24 oder 36 Karten
- Einstellungen werden im Browser gespeichert
- Ergebnisanzeige nach dem Aufdecken aller Kartenpaare

## Voraussetzungen

- Node.js und npm

## Lokal starten

```bash
npm install
npm run dev
```

Vite zeigt nach dem Start die lokale Adresse im Terminal an.

## Build und Vorschau

```bash
npm run build
npm run preview
```

Der Build prüft zuerst die TypeScript-Typen und erzeugt anschließend die optimierte Website im Ordner `dist/`. `npm run preview` startet eine lokale Vorschau dieses Builds.

## Veröffentlichung

Für ein Deployment den Inhalt von `dist/` auf einem statischen Webhost veröffentlichen. Nach Änderungen am Quellcode den Build erneut mit `npm run build` erstellen. `dist/` ist generierte Ausgabe und wird von Git ignoriert.

## Projektstruktur

- `index.html`, `settings.html`, `game.html`, `impressum.html`: Seiten des Spiels
- `src/`: TypeScript-Logik und SCSS-Styles
- `public/assets/`: Bilder, Icons und Schriftdateien
- `dist/`: generierte Build-Ausgabe
