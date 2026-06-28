# Giuseppe Tiano — Curriculum 98

Un curriculum personale travestito da desktop anni Novanta.

Le informazioni non sono nascoste dietro uno scroll infinito, una landing con slogan generici o una foto davanti a una lavagna. Sono in cartelle: esperienza, formazione, competenze, progetti e contatti. Come il buon senso suggeriva prima che ogni sito decidesse di diventare una piattaforma.

## Cosa contiene

- Desktop in stile Windows 98, senza usare loghi o risorse Microsoft
- Cartelle apribili con doppio clic su desktop e un tocco su smartphone
- Finestre trascinabili, riducibili a icona, ingrandibili e chiudibili
- Menu Avvio e taskbar dinamica
- Curriculum completo stampabile o salvabile in PDF dal browser
- Download di una versione testuale del curriculum
- Layout adattato anche a mobile

## File

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` contiene desktop, cartelle e testi del curriculum.
- `style.css` costruisce l’interfaccia retro: bordi, finestre, icone e taskbar.
- `script.js` gestisce finestre, drag, menu Avvio, orologio e download del CV.

## Personalizzazione rapida

I testi principali sono in `index.html`.

Per modificare mail, esperienze, formazione e progetti basta cercare le sezioni rispettive. Il bottone `Scarica .txt` usa una copia del contenuto in `script.js`, dentro la funzione `buildCvText()`; quando aggiorni il CV, aggiorna anche quel testo per mantenere le due versioni coerenti.

## Avvio locale

Apri `index.html` nel browser. Non serve installare nulla.

## Pubblicazione

Il progetto è composto solo da HTML, CSS e JavaScript, quindi è adatto alla pubblicazione come sito statico.

## Nota di stile

L’ispirazione è l’esperienza desktop degli anni Novanta: il progetto non è affiliato a Microsoft e non riproduce software originale.

## Licenza

Puoi riusare e modificare il progetto liberamente per il tuo portfolio personale.
