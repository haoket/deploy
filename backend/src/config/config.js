import dotenv from 'dotenv';

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PWD, SQL_DB, SQL_SERVER } = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";


const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {

            enableArithAbort: true
        }
    }
};

export default config;




export const vnp_TmnCode = 'CGXZLS0Z';
export const vnp_HashSecret = 'XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN';
export const vnp_Url = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
export const vnp_ReturnUrl = 'http://127.0.0.1:5173/blog';