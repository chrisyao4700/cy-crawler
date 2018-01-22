var Crawler = require("js-crawler");
var filter = require('./CYFilter');
var connector = require('../mysql_socket/CYConnector');

function startCrawl(url) {
    //console.log('I AM AT START START CRAWL');
    new Crawler().configure({depth: 10})
        .crawl(url, function (page) {
            //console.log(page);
            //console.log(page.url);
            //console.log(page.body);
            var list = filter.extractEmails(page.body);
            var listSMS = filter.extractNumbers(page.body);
            console.log(page.url);
            console.log(listSMS);

            if (list !== null) {
                if (list.length > 0) {
                    //console.log(list);
                    list.forEach(function (value) {
                        var query = "INSERT INTO `cy_email` (`email`, `cdate`) VALUES ('" + value + "' , now() ) ";
                        console.log(query);
                        connector.performQuery(query, function (err, result) {
                            //console.log(err);

                        });
                    })
                }
            }
            if (listSMS != null) {
                if (listSMS.length > 0) {
                    listSMS.forEach(function (value) {
                        var query = "INSERT INTO `jl_sms` (`cell`, `cdate`) VALUES ('" + value + "' , now() ) ";
                        console.log(query);
                        connector.performQuery(query, function (err, result) {
                            //console.log(err);

                        });
                    })
                }
            }
            //console.log(page);
        }, function (response) {
            // console.log("ERROR occurred:");
            // console.log(response.status);
            // console.log(response.url);
            // console.log(response.referer);
        });
}

function testCrawl(text) {
    var list = filter.extractEmails(text);
    if (list !== null) {
        list.forEach(function (value) {
            console.log(value);
        });
    }else{
        console.log('CANNOT FIND ANY MATCH IN ' + "'" + text + "'");

    }

}


module.exports.startCrawl = startCrawl;
module.exports.testCrawl = testCrawl;
