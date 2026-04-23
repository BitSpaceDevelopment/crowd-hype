var mysql = require('mysql2');

// ENVIRONMENT LOADS
let mysqlDB = null; // db handler
let connectFreq = 5000; // When database is disconnected, how often to attempt reconnect? Value is in miliseconds
let testFreq = 5000; // After database is connected, how often to test connection is still good? Value is in Miliseconds

function attemptMySQLConnection(callback) {
  console.log('attempting MySQL Connection')
    mysqlDB = mysql.createPool({
      host: 'localhost',
      port: 3306, 
      user: 'root',
      password: 'root_password',
      database: 'crowdhypeHS',
      connectionLimit: 300,
      waitForConnections: true,
      queueLimit: 300,
      debug: false
    });
}

function testConnection(cb) {
  console.log('Testing Connection')
  mysqlDB.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    try {
      if (error) {
        throw new Error('No DB Connection');
      } else {
        if (results[0].solution) {
          cb(true)
        } else {
          cb(false)
        }
      }
    } catch (e) {
      // console.error(e.name + ': ' + e.message);
      cb(false)
    }
  });
}

function callbackCheckLogic(res) {
  if (res) {
    console.log('Connection is good. Scheduling next test for ', testFreq, 'ms')
    setTimeout(testConnectionCB, testFreq);
  } else {
    console.log('Connection was bad. Scheduling connection attempt for ', connectFreq, 'ms')
    setTimeout(connectMySQL, connectFreq);
  }
}

function testConnectionCB() {
  testConnection((result) => {
    callbackCheckLogic(result);
  })
}

function connectMySQL () {
  attemptMySQLConnection(result => {
    callbackCheckLogic(result);
  });
}

connectMySQL(); //starts test method 
module.exports = mysqlDB;