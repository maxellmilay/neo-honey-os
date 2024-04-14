const dbmgr = require("../../shared/config/dbManager")
const db = dbmgr.db;

const authenticateUser = (password) => {
    try {
        const user = db.prepare('SELECT * FROM users WHERE password = ?').get(password);
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    authenticateUser,
};
