//dbConfig.js
const Database = require("better-sqlite3")
const path = require("path")

const dbPath =
	process.env.NODE_ENV === "development"
		? "./src/backend/db/honeyOS"
		: path.join(process.resourcesPath, "./src/backend/db/honeyOS")

const db = new Database(dbPath)
db.pragma("journal_mode = WAL")

exports.db = db