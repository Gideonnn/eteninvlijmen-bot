const axios = require('axios');

module.exports = {
  register: (code, tgUserId, tgUserName) => {
    return axios.post(`http://localhost:3000/actions/register/${code}`, { tgUserId, tgUserName });
  },
  unregister: (userId) => {
    return axios.post(`http://localhost:3000/actions/unregister/${userId}`, {});
  },
};
