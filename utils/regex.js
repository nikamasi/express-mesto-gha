// eslint-disable-next-line no-useless-escape
const urlRegex = /^https?:\/\/[a-zA-Z0-9-]*\.[a-z]*\/?[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*/;
const mongooseIdRegex = /^[a-fA-F0-9]{24}$/;
module.exports = { urlRegex, mongooseIdRegex };
