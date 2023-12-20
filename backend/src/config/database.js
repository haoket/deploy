import mysql from 'mysql';

const createDatabaseConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'trendy'
    });

    return connection;
};

export default createDatabaseConnection;
