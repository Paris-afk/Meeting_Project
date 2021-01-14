const request = require("request");

function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;

  function list(table) {
    return req("GET", table);
  }

  function req(method, table, data) {
    let url = URL + "/" + table;
    console.log(url);
    body = "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("error con base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          // console.log(resp);
          return resolve(resp.body);
        }
      );
    });
  }
  return {
    list,
  };
}

module.exports = createRemoteDB;
