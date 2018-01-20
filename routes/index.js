var express = require('express');
var router = express.Router();

var cyCrawler = require('../modules/crawler/CYCrawler');
var ccExtractor = require('../modules/crawler/CCEmailExtractor');

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });

    cyCrawler.startFuck('http://www.58.com/');
    //ccExtractor.startFuck();
    res.json({
        status: true,
        message: "ROOT URL"
    });
});

module.exports = router;
