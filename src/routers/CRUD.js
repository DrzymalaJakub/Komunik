const mysql = require("mysql")

function CreateLog(changedState, message){
    console.log(`${Date.now()}:${changedState} - ${message}`)
}

exports.GetDatabaseConnection = (host, user, password, database) => {
    return mysql.createConnection({
        host: `${host}`,
        user: `${user}`,
        password: `${password}`,
        database: `${database}`
    });
}
exports.RequestQuery = (database, select, from, additional = ";") => {
    let results = [];
    database.connect((err, result) => {
        if (err) throw err
        CreateLog("connected", "SELECT")
    });
    database.query(`SELECT ${select} FROM ${from} ${additional}`, (err, result)=> {
        if (err) throw err
        CreateLog("success", "SELECT")
        results = result
    });
    database.end((err)=>{
        if(err) throw err
        CreateLog("disconnected", "SELECT")
    });
    return results;
}
