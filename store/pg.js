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
  birthDate
) {
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO users (id_sexual_preference,id_genre,email,password,name,lastname,date_birth) VALUES  (${sexual_preference},${genre},'${email}','${password}','${name}','${lastname}','${birthDate}')`,
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

//upload images, not for profile image
function uploadPicture(idUser, image, date) {
  return new Promise((resolve, reject) => {
    client.query(
      `
      INSERT INTO images (image, upload_date)
        VALUES('${image}', '${date}');
      INSERT INTO images_users (id_image, id_user) 
        VALUES(currval(pg_get_serial_sequence('images','id_image')),${idUser});
      `,
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

function getImagesByUser(id) {
  return new Promise((resolve, reject) => {
    client.query(
      `Select * 
       From images_users,images
       where images_users.id_user = ${id} and images_users.id_image = images.id_image;`,
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

function getProfileImageByUser(id) {
  return new Promise((resolve, reject) => {
    client.query(
      `Select profile_picture 
       From users
       where id_user = ${id};`,
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

module.exports = {
  list,
  get,
  insertUsers,
  deleteUser,
  updateUsers,
  uploadProfilePicture,
  uploadPicture,
  getImagesByUser,
  getProfileImageByUser,
};
