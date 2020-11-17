# IT2810 - Team 55 -  Prosjekt 3
Dette prosjektet er laget ved hjelp av node.js, npm og React med Redux, Material UI.
Det er lagt opp til at vurdering av prosjektet gjøres lokalt ved å klone repoet med Clone.

## Kommandoer
### For å kjøre lokalt:
* Klon repoet fra GitLab 
`git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-00/p4-07/prosjekt-4-jns.git`
* Sjekk at du er koblet til [VPN](https://innsida.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN) eller [NTNU sitt nettverk](https://innsida.ntnu.no/wiki/-/wiki/Norsk/Trådløst+nett)
* Første gang du kjører (eller ved package.json endringer): `npm run firstStart` i rotmappen.
* Installasjon kan muligens ta en liten stund, varierende fra maskin og nettverk
* Hvis det er problemer med npm pakker, kjør `npm run setup` i rotmappen.
* Hvis det fortsatt er problemer med å starte/kjøre tester, kjør `npm install` separat i både backend og frontend mappene.
* Ellers: `npm start` i rotmappen.

### For å bare kjøre backend:
* Sjekk at du er på VPN/ NTNU nett
* Kjøre første gang: `cd backend` => `npm install` => `npm start`
* Ellers: `cd backend` => `npm start`

### For å bare kjøre frontend:
* Sjekk at du er på VPN/ NTNU nett
* Kjøre første gang: `cd frontend` => `npm install` => `npm start`
* ellers: `cd frontend` => `npm start`

### For å kjøre tester:
* For enhetstester:  `cd frontend` => `npm test`
* For ende-til-ende og ui tester: `cd frontend` => `npx cypress open`
    (For å kjøre disse testene må både frontend og backend allerede kjøre)

## Beskrivelse
### Funksjonalitet og teknologi
For prosjekt 4 valgte jeg å gå med oppgave B og finpusse nettsiden. Her er en liste av ting som har endret seg.
* Filmene blir nå hentet inn med et caching system som passer på at hver film bare lastes ned en gang.
* All filtrering og sortering av filmene gjøres nå på backend, der man bare laster inn filmene som vises.
* Det er nå snapshot tester for alle komponentene
* Komponentene har blitt delt opp i container komponenter og presentational komponenter
* Alle Semantic ui komponenter er flyttet over til material ui
* Fjernet alle CSS filer og inline styling, bruker nå materil ui makeStyles istedenfor
* Nettsiden har generelt endret utseende
* Mye any har blitt typet, her utenom MuI styling og slikt der det ikke var hensiktsmessig
* Testing bruker nå data-testid for å følge Cypress best practice
* Gitlab pipeline passer på at es-lint og snapshot testene fungerer
* Restrukturert redux til å opprettholde immutable state


### Testing 
Vi har brukt både Jest, og Cypress for å ha enhetstester, og ende-til-ende tester. Referer til [Kommandoer](#Kommandoer) for å kjøre dem. Jest er brukt for Snapshot tester, som sjekker at riktig antall komponenter blir rendret, og at props blir passet korrekt. 
Cypress er brukt for å automatisere testene, vi har laget simulasjonene med tanke på hvordan en bruker ville brukt applikasjonen vår. Simulasjonene dekker også alle kravene til funksjonalitene. I tillegg har vi gjort API test calls gjennom Cypress. Crypress kan ta en stund å laste ned.

![](https://i.imgur.com/ZOF3wY1.png)



Etter å ha kjørt `npx cypress open` i frontend vil du muligens bli spurt om å tillate tilgang for cypress, noe som er nødvendig. Deretter vil det være en popup som viser deg alle testene. Du kan enten kjøre alle testene ved å trykke på Run all specs, eller fritt velge fra listen og kjøre de hver for seg. Her er det viktig å la testene kjøre ferdig. Trykk på navnet på test fila, IKKE "Open in IDE".
Hvis testene failer er det mulig de ikke rakk å laste inn filmene. Det funker ofte å kjøre på nytt.

![](https://i.imgur.com/BUBjJD6.png)

* APItestCall: Simulerer get/post request og sjekker dette opp mot databasen
* simulation1: Simulerer en bruker som ønsker å legge filmer til watched list
* simulation2: Simulerer en bruker som ønsker å søke lese detaljer på Historie filmen med høyest rating etter 1995
* simulation3: Simulerer en bruke på mobil som ønsker å søke opp den korteste filmen mellom 1985 og 2005

### Ressurser
- Innholdet fra databasen er tatt fra [FEND16](https://github.com/FEND16/movie-json-data?fbclid=IwAR1x59Rv0NctGe8NrlnWahhZGjgEwLFy0ZiUm_mX6ghofQVg_FJUfim-QHM).
- [Material-UI](https://material-ui.com) sine.
- I tillegg til Jest, har vi brukt [@testing-libray/user-event](https://github.com/testing-library/user-event) og [Cypress](https://www.cypress.io/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).