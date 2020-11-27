const { Pool, Client, pg, Connection } = require("pg");

const config = require("../config");

const dbconf = {
  user: config.pg.user,
  host: config.pg.host,
  database: config.pg.database,
  password: config.pg.password,
  port: config.pg.port,
  ssl: { rejectUnauthorized: false },
};
const client = new Client(dbconf);
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

function get(tabla, id) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT * FROM ${tabla} WHERE id_user = ${id}`,
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve(data);
          console.log(id);
        }
      }
    );
  });
}

module.exports = {
  list,
  get,
};
