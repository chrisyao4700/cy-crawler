var Crawler = require("js-crawler");
var filter = require('./CYFilter');

function startFuck(url) {
    new Crawler().configure({depth: 10})
        .crawl(url, function(page) {
            //console.log(page.url);
            //console.log(page.body);
            var list = filter.extractEmails(page.body);

            if (list !== null){
                if (list.length > 0){
                    console.log(list);
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