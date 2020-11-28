const { Pool, Client, pg, Connection } = require("pg");

const config = require("../config");
//data base settings
const dbconf = {
  user: config.pg.user,
  host: config.pg.host,
  database: config.pg.database,
  password: config.pg.password,
  port: config.pg.port,
  ssl: { rejectUnauthorized: false },
};
const client = new Client(dbconf);

//data base connection
function handleConnection() {
  client.connect((err) => {
    if (err) {
      console.log("db err", err);
      // setTimeout(handleConnection,2000);
    } else {
      console.log("DB Connected");
    }
  });
}
handleConnection();

//list with all users
function list(tabla) {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM ${tabla}`, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

//find an user by id
function get(tabla, id) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT * FROM ${tabla} WHERE id_user = ${id}`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(data);
          // console.log(id);
        }
      }
    );
  });
}
//insert new users
function insertUsers(
  sexual_preference,
  genre,
  email,
  password,
  name,
  lastname,
  birthDate,
  reports
) {
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO users (id_sexual_preference,id_genre,email,password,name,lastname,date_birth,n_report) VALUES  (${sexual_preference},${genre},'${email}','${password}','${name}','${lastname}','${birthDate}','${reports}')`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}
//delete user
function deleteUser(tabla, id) {
  return new Promise((resolve, reject) => {
    client.query(`DELETE FROM ${tabla} WHERE id_user = ${id}`, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        resolve(data);
        // console.log(id);
      }
    });
  });
}

//update users
function updateUsers(
  id,
  sexual_preference,
  genre,
  email,
  password,
  name,
  lastname,
  dateBirth
) {
  return new Promise((resolve, reject) => {
    client.query(
      `UPDATE users SET(id_sexual_preference,id_genre,email,password,name,lastname,date_birth) = (${sexual_preference},${genre},'${email}','${password}','${name}','${lastname}','${dateBirth}') WHERE id_user = ${id}`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

//**************** IMAGES */

//upload profile picture
function uploadProfilePicture(TABLA, id, image) {
  return new Promise((resolve, reject) => {
    client.query(
      `UPDATE ${TABLA}  SET profile_picture = '${image}' WHERE id_user = ${id}`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

module.exports = {
  list,
  get,
  insertUsers,
  deleteUser,
  updateUsers,
  uploadProfilePicture,
};
