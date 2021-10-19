//  Datenbank importieren
const db = require('../db/index.js');

// a. Route zum Holen aller Informationen über die Autos in cars.json.

async function getCars() {
  const { rows } = await db.query('SELECT * from cars');
  return { code: 200, data: rows };
}

// b. Route zum Ändern des Status eines Autos. Zum Beispiel von available auf reserved oder sold.
async function changeStatus(id, status) {
  try {
    // Das Auto holen
    const { rows } = await db.query('Select * from cars where id = $1', [id]);

    // Wenn es dieses Auto nicht gibt soll eine Fehlermeldung ausgegeben werden
    if (rows[0] === undefined) {
      return {
        code: 404,
        data: 'Not found',
      };
    }

    //   Überprüfen ob Status okay ista
    if (status !== 'available' || status !== 'reserved' || status !== 'sold') {
      return {
        code: 400,
        data: 'Wrong Status',
      };
    }

    //   Update Befehl
    await db.query('UPDATE cars set status = $1 where id = $2', [status, id]);
  } catch (error) {
    return { code: 500, data: error.message };
  }
}
// c. Route zum Löschen eines Autos.
// d. Route zum Einfügen eines neuen Autos. Daten:
