import mysql from 'mysql';

const createDatabaseConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    return connection;
};

export default createDatabaseConnection;
