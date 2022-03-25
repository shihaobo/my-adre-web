// const Mock = require("mockjs");

const user = require("./user");
const home = require("./home");
const mocks = [...user, ...home];

module.exports = function ({ app }) {
  mocks.forEach((mock) => {
    if (mock.proxy) {
      app[mock.method](mock.url, (req, res) => {
        res.json(mock.response);
      });
    }
  });
};
