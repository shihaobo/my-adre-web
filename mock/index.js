// const Mock = require("mockjs");

const user = require("./user");
const mocks = [...user];
module.exports = function ({ app }) {
  mocks.forEach((mock) => {
    if (mock.proxy) {
      app[mock.method](mock.url, (req, res) => {
        res.json(mock.response);
      });
    }
  });
};
