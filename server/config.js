const {Client} = require('pg');

const client =  new Client({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "123",
    port: 5432
});

async function startTheDB(){
    try {
        await client.connect();
        console.log('connected to the db');
    } catch (error) {
        console.log('error in db file',error);
    }
}

startTheDB();

module.exports = client;