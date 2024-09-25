const moment = require("moment");
exports.generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

exports.generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf(),
  };
};
