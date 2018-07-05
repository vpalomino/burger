var mysql = require('mysql')

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'burgers_db'
    })
}

connection.connect(function(err) {
    if (err) {
        console.log('Error connection: ' + err.stack)
        return
    }
    console.log('Connected as id ' + connection.threadId)
})

module.exports = connection;