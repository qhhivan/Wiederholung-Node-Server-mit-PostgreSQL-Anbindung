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
    const { car } = await db.query('Select * from cars where id = $1', [id]);

    // Wenn es dieses Auto nicht gibt soll eine Fehlermeldung ausgegeben werden
    if (car[0] === undefined) {
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

    return {
      code: 200,
      data: 'Status Changed',
    };
  } catch (error) {
    return { code: 500, data: error.message };
  }
}

// c. Route zum Löschen eines Autos.
async function deleteCar(id) {
  // Überprüfen ob es dieses Auto gibt
  const car = await db.query('Select * from car where id = $1', [id]);

  if (car[0] === undefined) {
    return {
      code: 404,
      data: 'Not found',
    };
  }

  try {
    // If found delete
    await db.query('Delete from car where id = $1', [id]);
    return { code: 200, data: 'Deleted' };
  } catch (error) {
    return { code: 500, data: error.message };
  }
}

// d. Route zum Einfügen eines neuen Autos. Daten:
async function addCar(car) {
  try {
    // max(ID) von cars holen
    const { maxId } = await db.query('SELECT max(id) FROM cars');
    const newCarId = maxId + 1;

    //   Überprüfen ob es den Besitzer schon gibt
    let { owner } = await db.query(
      'SELECT * FROM owner WHERE first_name = $1 and last_name = $2',
      [car.owner.firstName, car.owner.lastName],
    );

    if (owner.id === null) {
      // Owner wird eingefügt
      await db.query(
        'INSERT INTO public.owner ( first_name, last_name) VALUES ($1, $2);',
        [car.owner.firstName, car.owner.lastName],
      );

      // Owner wird als owner abgespeichert
      owner = await db.query(
        'SELECT * FROM owner WHERE first_name = $1 and last_name = $2',
        [car.owner.firstName, car.owner.lastName],
      );
    }
    // Owner ID holen
    const ownerID = owner.id;

    // Car erstellen
    await db.query(
      'insert into cars (id, title, image, status, price, miles, year_of_make, description, owner) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        newCarId,
        car.title,
        car.image,
        car.status,
        car.price,
        car.miles,
        car.yearOfMake,
        car.description,
        ownerID,
      ],
    );

    return {
      code: 200,
      data: `Car added with ID ${newCarId}`,
    };
  } catch (error) {
    return {
      code: 500,
      data: `Error while adding car. Error: ${error.message}`,
    };
  }
}

module.exports = { getCars, changeStatus, deleteCar, addCar };
