# IT2810 - Team 55 -  Prosjekt 3
Dette repoet er laget ved hjelp av node.js, npm, React, og det er lagt opp for bruk av Gitpod ved å følge merkelappen øverst.

## Kommandoer
### For å kjøre:
* Klon repoet
* Sjekk at du er på VPN/ NTNU nett
* Kjøre første gang (eller ved package.json endringer): `npm run firstStart`
* Ellers: `npm start`

### For å bare kjøre backend:
* Make sure to be on VPN/NTNU network
* Kjøre første gang: `cd backend` => `npm install` => `npm start`
* Ellers: `cd backend` => `npm start`

### For å bare kjøre frontend:
* Sjekk at du er på VPN/ NTNU nett
* Kjøre første gang: `cd frontend` => `npm install` => `npm start`
* ellers: `cd frontend` => `npm start`

### For å kjøre tester:
* For enhetstester:  `cd frontend` => `npm test`
* For ende-til-ende tester: `cd frontend` => `npx cypress open`

## Beskrivelse
### Funksjonalitet og teknologi
Per oppgavebeskrivelse er løsningen vår laget gjennom React, og initialisert med create-react-app, med typescript som template. Løsningen vår er en filmdatabase, for å dekke kravene til oppgaven har vi følgende funksjonaliteter:
* Søkemulighet ved hjelp av input felt
* Filtrerinsgmuligheter ved hjelp av slider, og sortering
* Blaing av sider for å ikke presentere alle filmene i databasen på en gang
* Popup for å gi en mer detaljert beskrivelse av filmen
* Lagring av brukerdatagenerert ved hjelp av brukerlogging, og lagring/sletting av filmer til en "Movie list" unik for brukeren
* Satt opp database på virtuell maskin for å håndtere filmer, og brukerdata

Under utviklingen har vi brukt Redux for å håndtere states, grunnet valg av Redux var at ingen av gruppemedlemmene hadde erfaring med det, og vi hadde stort ønske om å lære om det. Vi ble også tiltrukket av Redux sin store community, og dens popularitet. Vi likte også veldig godt tanken om én "store", kontra MobX sin minimum to, da vi i starten av utviklingsfasen tenkte det ville være mer hensiktmessig med én. Gjennom litt søking så vi at Redux var ansett som litt mer simplistisk og enkelt å forstå, noe som virket tiltrekkende. Et irritasjonsmoment ved Redux i starten var all boilerplate koden som måtte skrives for å komme i gang, og vi ser at dette muligens var egnet for større og mer komplekse prosjekter, men førsteintrykket vårt var at prosjektet skal by på utfordringer, og da falt valget på Redux.  

For å håndtere databasen vår ble det brukt MongoDB, da det var anbefalt av foreleser. Siden vi har vært borti MySQL i database faget, tenkte vi å ta denne anbefalingen, både for popularitet, og læringen sin skyld. MongoDBCompass bydde også på et pent håndteringsmetode av data, noe som ble veldig godt likt av gruppen.

Vi har satt opp applikasjonen vår til å kjøre en REST server lokalt ved hjelp av Express, og Node. Alternativet GraphQL ga inntrykk av å ha en enklere get/post oppsett, men vi hadde en preferanse for HTTP sine calls. Selv om noen synes det kan være noe upraktisk med håndtering av API calls for HTTP, så har det vært vel etablert i mange år. Ettersom vi har valgt noen nye teknologier tidligere, bestemte vi oss for å ta noe som vi har sett før. Selv om oppsett av serveren blir nytt, er API calls noe kjent fra før av. 


### Testing 
Vi har brukt både Jest, og Cypress for å ha enhetstester, og ende-til-ende tester. Referer til [Kommandoer](#Kommandoer) for å kjøre dem. Jest er brukt for Snapshot tester, sjekke at riktig antall komponenter blir rendret, og at props blir passet korrekt. 
Cypress er brukt for å automatisere testene, vi har laget simulasjonene med tanke på hvordan en bruker ville brukt applikasjonen vår. Simulasjonene dekker også alle kravene til funksjonalitene. I tillegg har vi gjort API test calls gjennom Cypress. 

### Ressurser
- Innholdet fra databasen er tatt fra [FEND16](https://github.com/FEND16/movie-json-data?fbclid=IwAR1x59Rv0NctGe8NrlnWahhZGjgEwLFy0ZiUm_mX6ghofQVg_FJUfim-QHM).
- For tredjeparts komponenter har vi brukte [Semantic UI](https://react.semantic-ui.com/) sine.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).