const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors')
const usersRouter = require('./src/routes/users');

const db = require('./src/db');
const sequelize = db.sequelize;

try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});