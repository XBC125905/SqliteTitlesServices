var MBTiles = require('@mapbox/mbtiles');

var express = require('express');
var router = express.Router();

new MBTiles('./datas/test.mbtiles', function(err, mbtiles) {
    //访问的url是：http://localhost:7777/tiles/{z}/{x}/{y}.pbf
    router.get(/^\/tiles\/(\d+)\/(\d+)\/(\d+)$/, function(req, res) {
        var z = req.params[0];
        var x = req.params[1];
        var y = req.params[2];
        console.log('get tile %d, %d, %d', z, x, y);


        mbtiles.getTile(z, x, y, function(err, data, headers) {
            if (err) {
                res.status(404);
                res.send(err.message);
                console.log(err.message);
            } else {
                res.set(headers);
                res.send(data);
            }
        });
    });
});


module.exports = router;

