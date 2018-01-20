var Crawler = require("js-crawler");
var filter = require('./CYFilter');
var connector = require('../mysql_socket/CYConnector');

function startFuck(url) {
    new Crawler().configure({depth: 10})
        .crawl(url, function(page) {
            //console.log(page.url);
            //console.log(page.body);
            var list = filter.extractEmails(page.body);

            if (list !== null){
                if (list.length > 0){
                    //console.log(list);
                    list.forEach(function (value) {
                        var query = "INSERT INTO `cy_email` (`email`, `cdate`) VALUES ('"+ value+"' , now() ) ";
                        connector.performQuery(query, function (err, result) {
                            //console.log(err);
                        });
                    })
                }
            }
            //console.log(page);
        }, function(response) {
            // console.log("ERROR occurred:");
            // console.log(response.status);
            // console.log(response.url);
            // console.log(response.referer);
        });
}


module.exports.startFuck = startFuck;