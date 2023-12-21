import mysql from 'mysql';

const createDatabaseConnection = () => {
    const connection = mysql.createConnection({
        // host: process.env.HOST,
        // user: process.env.USER,
        // password: process.env.PASSWORD,
        // database: process.env.DATABASE
        host: "mysql-beauty.alwaysdata.net",
        user: "beauty",
        password: "qwerty.123456",
        database: "beauty_shop"
    });

    return connection;
};

export default createDatabaseConnection;
