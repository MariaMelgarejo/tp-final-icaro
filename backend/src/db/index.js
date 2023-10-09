const { Sequelize } = require("sequelize")
const mysql = require('mysql2');
const dbConfig = require("./config/config.json")

module.exports = db = {};

// create db if it doesn't already exist
const { host, port, user, password, database, dialect, dialectOptions } = dbConfig.development;
const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// connect to db
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect,
    dialectOptions,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

db.sequelize = sequelize;

// const User = require('./models/user')

// db.User = User;

// sync all models with database
sequelize.sync();