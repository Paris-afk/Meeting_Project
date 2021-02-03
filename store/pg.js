const { Pool, Client, pg, Connection } = require("pg");
const fs = require("fs");
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

function getUserId(email) {
  // console.log(email, password);
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT * FROM users WHERE email = '${email}'`,
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
  age,
  description,
  id
) {
  datos = {
    sexual_preference: sexual_preference,
    genre: genre,
    email: email,
    name: name,
    lastname: lastname,
    age: age,
    description: description,
  };
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO users (id_sexual_preference,id_genre,email,password,name,lastname,age,description) VALUES  (${sexual_preference},${genre},'${email}','${password}','${name}','${lastname}',${age},'${description}')`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(datos);
        }
      }
    );
  });
}

function deleteUser(tabla, id) {
  //this is for delete all files uploaded
  return (
    new Promise((resolve, reject) => {
      client.query(
        `SELECT * FROM images WHERE id_user = ${id}`,
        (err, data) => {
          if (err) {
            return reject(err);
          } else {
            resolve(data);
            // console.log(data.rows[0].image);
            const myData = data.rows.map((dataItem) => {
              //console.log(dataItem.image);
              //para borrar las imagenes del server tambien
              let path = dataItem.image;

              fs.unlink(path, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            });
          }
        }
      );
    })
      //here it's for delete all db images paths
      .then(() => {
        client.query(`DELETE FROM images WHERE id_user = ${id}`, (err) => {
          if (err) {
            return reject(err);
          }
        });
      })
      //finally delete user from data base
      .then(() => {
        client.query(`DELETE FROM users WHERE id_user = ${id}`, (err) => {
          if (err) {
            return reject(err);
          }
        });
      })
  );
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
  age,
  description
) {
  return new Promise((resolve, reject) => {
    client.query(
      `UPDATE users SET(id_sexual_preference,id_genre,email,password,name,lastname,age,description) = (${sexual_preference},${genre},'${email}','${password}','${name}','${lastname}',${age},'${description}') WHERE id_user = ${id}`,
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

function changePassword(id, password) {
  return new Promise((resolve, reject) => {
    client.query(
      `UPDATE users SET password = '${password}' WHERE id_user = ${id}`,
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

function getHashedPassword(id) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT password FROM users WHERE id_user = ${id}`,
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

//**************** HOBBIES */

//INDICATE USER'S HOBBIES
function hobbiesByUser(idUser) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT h.id_hobbie,h.description
       FROM  hobbies as h,hobbies_users as hu
       WHERE hu.id_hobbie = h.id_hobbie and hu.id_user = ${idUser}`,
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

/** call all user's hobbies */
function selectHobbies(idUser, idHobbie) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT * from (id_user,id_hobbie) VALUES  (${idUser},${idHobbie})`,
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

function allHobbies() {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM hobbies`, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        resolve(data);
      }
    });
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

// codigo para tomar ultimo id e insertar en multiples tablas
//       INSERT INTO images (image, upload_date)
//         VALUES('${image}', '${date}');
//       INSERT INTO images_users (id_image, id_user)
//         VALUES(currval(pg_get_serial_sequence('images','id_image')),${idUser});

function uploadPicture(idUser, image, date) {
  return new Promise((resolve, reject) => {
    client.query(
      `
      INSERT INTO images (image, upload_date,id_user)
        VALUES('${image}', '${date}',${idUser});
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
       From images
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

/********************** AUTH */

function localLogin(email, password) {
  return new Promise((resolve, reject) => {
    client.query(
      `Select * 
       From users
       where email = '${email}';`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          // console.log(email, password);
          resolve(data);

          // console.log(id);
        }
      }
    );
  });
}

/** LIKES */

function postLikesbyUser(idUser, idReceptor) {
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO LIKES (id_of_user,id_of_user_receptor) VALUES ('${idUser}','${idReceptor}');`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          // console.log(email, password);
          resolve(data);

          // console.log(id);
        }
      }
    );
  });
}

function getUsersWhoLikeMe(idUser) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT users.id_user,users.id_sexual_preference,id_genre,name,lastname,profile_picture,age,description
        FROM users,likes
        WHERE   likes.id_of_user = users.id_user and likes.id_of_user_receptor = ${idUser};`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          // console.log(email, password);
          resolve(data);

          // console.log(id);
        }
      }
    );
  });
}

/**DISLIKES */

function postDislikesbyUser(idUser, idReceptor) {
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO dislikes (id_of_user,id_of_user_receptor) VALUES ('${idUser}','${idReceptor}');`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          // console.log(email, password);
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
  localLogin,
  selectHobbies,
  allHobbies,
  hobbiesByUser,
  getUserId,
  postLikesbyUser,
  getUsersWhoLikeMe,
  postDislikesbyUser,
  changePassword,
  getHashedPassword,
};
