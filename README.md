# Inge Bra Bygg,

## Tekniker
● Node
● Express
● Mongoose eller SQLite
● JWT
● Bcrypt
● JSON
● Projektstruktur enligt MVC
● RBAC
● Filuppladdning
Endpoints
Notera att vissa endpoints förekommer flera gånger under olika roller.

## Insrtuktionen
Läs noga igenom hela projektbeskrivningen.
För att komma igång
● Problemanalys, vilka delproblem finns det?
● Sätt upp en Trello
● Planera in möten och hur dessa möten ska gå till
● Skissa på datamodellen med ER-diagram, vilka entiteter och relationer finns det?
● Sätt upp utvecklingsmiljön (forka repo, initiera node-projekt, boilerplating, etc)
● Sätt upp databasen och ett seed-script
● Skissa på Models och Controllers, vilka behöver du?
I slutet på varje lektion kommer gruppen redovisa kort för läraren hur utvecklingen av
webbtjänsten fortlöper.

## Specifaktion
Webbtjänsten ska ta emot och svara med JSON.
Resurser: Användare, Ärenden och Meddelanden och bilder.
Ärenden ska ha datum när ärendet skapades, datum när den ändrades och om ärendet är
avklarat.
Tre roller, admin, worker och client. (Notera att det inte ska finnas ett anonymt läge)
Admin ska kunna skapa nya konton och kunna radera resurser.
Arbetare ska kunna skapa ärenden kopplade till kunder, skriva meddelanden på ärenden,
ladda upp en bild kopplat till ärendet och markera ärenden som klart.
Kunder ska kunna se sina ärenden och skriva meddelanden på sina ärenden.


