const moment = require("moment");
moment.locale('es');
const hoy = moment();
const naci =moment("19990928" , "YYYYMMDD");
console.log("Fecha de hoy: ",hoy.format("L"));
console.log("Naci el:" , naci.format("L"));
console.log(`Desde mi nacimineto han pasado ${hoy.diff(naci, "years")} años`);
console.log(`Desde mi nacimineto han pasado ${hoy.diff(naci, "days")} dias`);