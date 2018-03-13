var sqlite3 = require('sqlite3');

var express = require('express');
var router = express.Router();

var db = new sqlite3.Database('./datas/testImg.sqlitedb',sqlite3.OPEN_READONLY, function(err) {
    if (err){
        console.log(err);
        throw err;
    }
});

//访问的url是：http://localhost:7777/tiles/{z}/{x}/{y}.pbf
router.get(/^\/tiles\/(\d+)\/(\d+)\/(\d+).png$/, function(req, res) {
    var z =16-Number(req.params[0]);
    var x = req.params[1];
    var y = req.params[2];
    console.log('get tile %d, %d, %d', z, x, y);

    var sql = 'SELECT image FROM tiles WHERE z = ? AND x = ? AND y = ?';
    db.get(sql, z, x, y, function(err, row) {
        if (err || row===undefined) {
            res.status(404);
            res.send(err);
            console.log(err);
        } else {
            //console.log(row);
            //res.set(headers);
            //res.send(row.image);
            res.writeHead(200, {'Content-Type': 'image/png' });

            res.write(row.image);
            res.end();
        }
    });
});

module.exports = router;

