# IT2810 - Team 55 -  Prosjekt 3
Dette prosjektet er laget ved hjelp av node.js, npm og React med Redux, Material UI og Semeatic UI.
Det er lagt opp til at vurdering av prosjektet gjøres lokalt ved å klone repoet med Clone with HTTPS.

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
* All filtrering og sortering av filmene gjøres nå på backend
* Det er nå snapshot tester for alle komponentene
* Komponentene har blitt delt opp i container komponenter og presentational komponenter
* Alle tredjepartskomponenter er flyttet over til material ui
* Fjernet alle CSS filer og inline styling, bruker nå materil ui makeStyles istedenfor
* Nettsiden har generelt endret utseende
* 

Under utviklingen har vi brukt Redux for å håndtere states, grunnet valg av Redux var at ingen av gruppemedlemmene hadde erfaring med det, og vi hadde stort ønske om å lære om det. Vi ble også tiltrukket av Redux sin store community, og dens popularitet. Vi likte også veldig godt tanken om én "store", kontra MobX sin minimum to, da vi i starten av utviklingsfasen tenkte det ville være mer hensiktmessig med én. Gjennom litt søking så vi at Redux var ansett som litt mer simplistisk og enkelt å forstå, noe som virket tiltrekkende. Et irritasjonsmoment ved Redux i starten var all boilerplate koden som måtte skrives for å komme i gang, og vi ser at dette muligens var egnet for større og mer komplekse prosjekter, men førsteintrykket vårt var at prosjektet skal by på utfordringer, og da falt valget på Redux.  

For å håndtere databasen vår ble det brukt MongoDB, da det var anbefalt av foreleser. Siden vi har vært borti MySQL i database faget, tenkte vi å ta denne anbefalingen, både for popularitet, og læringen sin skyld. MongoDBCompass bydde også på et pent håndteringsmetode av data, noe som ble veldig godt likt av gruppen.

Vi har satt opp applikasjonen vår til å kjøre en REST server lokalt ved hjelp av Express, og Node.  REST serveren er skrevet i TypeScript og kjører ved hjelp av ts-node pakken. Alternativet GraphQL ga inntrykk av å ha en enklere get/post oppsett, men vi hadde en preferanse for HTTP sine calls. Selv om noen synes det kan være noe upraktisk med håndtering av API calls for HTTP, så har det vært vel etablert i mange år. Ettersom vi har valgt noen nye teknologier tidligere, bestemte vi oss for å ta noe som vi har sett før. Selv om oppsett av serveren blir nytt, er API calls noe kjent fra før av. 


### Testing 
Vi har brukt både Jest, og Cypress for å ha enhetstester, og ende-til-ende tester. Referer til [Kommandoer](#Kommandoer) for å kjøre dem. Jest er brukt for Snapshot tester, som sjekker at riktig antall komponenter blir rendret, og at props blir passet korrekt. 
Cypress er brukt for å automatisere testene, vi har laget simulasjonene med tanke på hvordan en bruker ville brukt applikasjonen vår. Simulasjonene dekker også alle kravene til funksjonalitene. I tillegg har vi gjort API test calls gjennom Cypress. Crypress kan ta en stund å laste ned.

![](https://i.imgur.com/ZOF3wY1.png)



Etter å ha kjørt `npx cypress open` i frontend vil du muligens bli spurt om å tillate tilgang for cypress, noe som er nødvendig. Deretter vil det være en popup som viser deg alle testene. Brukere kan fritt velge fra listen og kjøre de hver for seg. Her er det viktig å la testene kjøre ferdig. Trykk på navnet på test fila, IKKE "Open in IDE".

![](https://i.imgur.com/BUBjJD6.png)

* APItestCall: Simulerer get/post request og sjekker dette opp mot databasen
* simulation1: Simulerer en bruker som ønsker å legge filmer til watched list
* simulation2: Simulerer en bruker som ønsker å søke lese detaljer på den eldste filmen med rating 7 eller høyere
* simulation3: Simulerer en bruke på mobil som ønsker å søke opp den korteste filmen mellom 1990 og 2005

### Ressurser
- Innholdet fra databasen er tatt fra [FEND16](https://github.com/FEND16/movie-json-data?fbclid=IwAR1x59Rv0NctGe8NrlnWahhZGjgEwLFy0ZiUm_mX6ghofQVg_FJUfim-QHM).
- For tredjeparts komponenter har vi brukt [Semantic UI](https://react.semantic-ui.com/) og [Material-UI](https://material-ui.com) sine.
- I tillegg til Jest, har vi brukt [@testing-libray/user-event](https://github.com/testing-library/user-event) og [Cypress](https://www.cypress.io/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).