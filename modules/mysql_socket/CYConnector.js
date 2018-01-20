const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'cy-crawler.cc0469w8uagy.us-west-1.rds.amazonaws.com',
    user: 'cycrawler2018',
    password: 'Ahs8da9sda9sdy',
    database: 'cy_crawler_email'
});

//console.log('I am creating pool');

function performQuery(query, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            conn.query(query, function (err, res) {
                callback(err, res);
                conn.release();

            });
        }
    });
}

function parseResult(rawData) {
    var string = JSON.stringify(rawData);
    return JSON.parse(string);
}

function createInsertQuery(table_name, pack) {
    var query_key = "(";
    var query_value = " VALUES (";
    var keys = Object.keys(pack);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var v = pack[keys[i]];
        query_key += "`" + k + "`, ";
        if (v === 'now()') {
            query_value += v + ", ";
        } else {
            query_value += "'" + v + "', ";
        }
    }
    query_key = query_key.slice(0, query_key.length - 2) + ")";
    query_value = query_value.slice(0, query_value.length - 2) + ")";
    var query = "INSERT INTO `" + table_name + "` " + query_key + query_value;

    return query;
}

function createUpdateQuery(table_name, primary_key, pack) {

    var query = "UPDATE `" + table_name + "` SET";
    var keys = Object.keys(pack);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var v = pack[keys[i]];
        if (v === 'now()') {
            query += "`" + k + "` = " + v + ", ";
        } else {
            query += "`" + k + "` = '" + v + "', ";
        }
    }
    query = query.slice(0, query.length - 2) + " WHERE `id` = " + primary_key;
    return query;
}

function configDataWithError(message, err, query) {
    return {
        status: false,
        message: message,
        errMsg: err,
        query: query
    };
}

function configDataWithDefaultResponse(msg) {
    return {
        status: false,
        message: "DEFAULT RESPONSE " + msg
    };
}

module.exports.performQuery = performQuery;
module.exports.parseResult = parseResult;
module.exports.createInsertQuery = createInsertQuery;
module.exports.configDataWithError = configDataWithError;
module.exports.configDataWithDefaultResponse = configDataWithDefaultResponse;
module.exports.createUpdateQuery = createUpdateQuery;
