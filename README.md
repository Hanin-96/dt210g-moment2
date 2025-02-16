# DT210G - Moment 2

Uppgiften går ut på att utveckla en "Att göra-lista" (Todo List) applikation med React och TypeScript. 
Applikationen ska kommunicera med databasen MongoDB och backendramverket Hapi tillsammans med valideringspaketet Joi.

## Komponenter
Applikationen består av flera olika komponenter som tillsammans renderas ut i App.tsx.

### States
States används för att uppdatera innehåll/data dynamiskt i formuläret, hämtning av todos och vid felhantering/errors.

### Datahämtning
Data hämtas med GET fetch anrop och renderas mha UseEffect hook.

### Status och delete
Status uppdateras samt delete sker i komponenten Todo.

### Styling
CSS styling implementeras i separat stilmall och som inline-css där det är lämpligt.

