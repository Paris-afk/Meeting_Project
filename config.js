module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },

  pg: {
    user: "ezzsxrenrsuike",
    host: "ec2-52-204-232-46.compute-1.amazonaws.com",
    database: "dfss3ag3jsaifn",
    password:
      "ad1fcb9dcf6fa6b364af459a7fda60f8ecf92d6d887b8128f7c660f4ffc16e77",
    port: 5432,
    ssl: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "secreto",
  },
};
