//  Datenbank importieren
const db = require('../db/index.js');

// a. Route zum Holen aller Informationen über die Autos in cars.json.

async function getCars() {
  const { rows } = await db.query('SELECT * from cars');
  return { code: 200, data: rows };
}
// b. Route zum Ändern des Status eines Autos. Zum Beispiel von available auf reserved oder sold.
// c. Route zum Löschen eines Autos.
// d. Route zum Einfügen eines neuen Autos. Daten:
