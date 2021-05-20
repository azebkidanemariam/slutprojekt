# Inge Bra Bygg

Inge Bra Bygg
Vi är så bra att vi bara mäter en gång

Bakgrund
Inge Berglund driver en byggfirma som renoverar fasader för privatpersoner och företag.
Firman har vuxit en del på senaste tiden och nu vill Inge göra det enklare för hans anställda
och kunder att kommunicera kring arbetet som utförs. För att Inge Bra Bygg ska kunna växa
så har Inge beställt en del av av en applikation som ska ta hand om all data och användare.
Denna del ska vara en webbtjänst som i framtiden förhoppnings kommer bli en del av en
större infrastruktur.

# Komma igång

1. Clone repo från Azeb https://github.com/azebkidanemariam/slutprojekt.git
2. Kör npm install
3. lägg till .env fil med SECRET och PORT variabler
4. kör projektet med npm start.
5. kör Database/userSeed.js.

# Endpoints

//Generella endpoints

post/authenticate
get/me
patch/me
get/users
get/users/:id

//Admin endpoints

post/users
patch/users/:id
delete/users/:id
delete/tasks/:id

//Worker endpoints

post/tasks
get/tasks/:id
post/tasks/:id/messages
patch/tasks/:id,
get/tasks/:taskID/messages/:page

//client endpoints

delete/messages/:id
post/tasks/:id/image

# Uppgiften

Specifikation
Webbtjänsten ska ta emot och svara med JSON.
Resurser: Användare, Ärenden och Meddelanden och bilder.
Ärenden ska ha datum när ärendet skapades, datum när den ändrades och om ärendet är
avklarat.
Tre roller, admin, worker och client. (Notera att det inte ska finnas ett anonymt läge)
Admin ska kunna skapa nya konton och kunna radera resurser.

Arbetare ska kunna skapa ärenden kopplade till kunder, skriva meddelanden på ärenden,
ladda upp en bild kopplat till ärendet och markera ärenden som klart.
Kunder ska kunna se sina ärenden och skriva meddelanden på sina ärenden.
Tekniker
● Node
● Express
● Mongoose eller SQLite
● JWT
● Bcrypt
● JSON
● Projektstruktur enligt MVC
● RBAC
● Filuppladdning
