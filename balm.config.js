const getConfig = require('./config/balmrc');
const api = require('./config/balm.api');
const getAfterTask = require('./config/balm.after-task');

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api,
    afterTask: getAfterTask(balm)
  };
};
