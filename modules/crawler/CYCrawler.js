var Crawler = require("js-crawler");
var filter = require('./CYFilter');
var connector = require('../mysql_socket/CYConnector');

function startCrawl(url) {

    new Crawler().configure({depth: 10})
        .crawl(url, function (page) {
            //var list = filter.extractEmails(page.body);
            //var listSMS = filter.extractNumbers(page.body);
            console.log(page.url);
            var handle_email = function (elist) {
                if (elist !== null) {
                    if (elist.length > 0) {
                        //console.log(list);
                        elist.forEach(function (value) {

                            var query = "INSERT INTO `cy_email` (`email`, `cdate`) VALUES ('" + value + "' , now() ) ";
                            //console.log(query);
                            connector.performQuery(query, function (err, result) {
                                //console.log(err);
                                if (!err) {

                                    console.log('FOUND EMAIL:' + value);
                                }else {
                                    console.log('')
                                }
                            });
                        })
                    }
                }
            };
            var handle_sms = function (slist) {
                if (slist != null) {
                    if (slist.length > 0) {
                        slist.forEach(function (value) {
                            var query = "INSERT INTO `jl_sms` (`cell`, `cdate`) VALUES ('" + value + "' , now() ) ";
                            //console.log(query);
                            //console.log(query);
                            connector.performQuery(query, function (err, result) {
                                //console.log(err);
                                if (!err) {
                                    console.log('FOUND NUMBER:' + value);
                                }else {
                                    console.log(err);
                                    console.log('INSERT NUMBER FAIL' + value);
                                }

                            });
                        })
                    }
                }
            };
            filter.extractEmailsAndSMS(page.body, handle_email, handle_sms);
            //console.log(page);
        }, function (response) {
            // console.log("ERROR occurred:");
            // console.log(response.status);
            // console.log(response.url);
            // console.log(response.referer);
        });
}

function testCrawl(text) {
    console.log(text);
    filter.extractEmailsAndSMS(text, function (elist) {
        if (elist !== null) {
            elist.forEach(function (value) {
                console.log('FOUND EMAIL:' + value);
            });
        } else {
            console.log('CANNOT FIND ANY MATCH EMAIL IN ' + "'" + text + "'");
        }

    }, function (slist) {
        //console.log('I AM AT FINISH');
        if (slist !== null) {
            slist.forEach(function (value) {
                console.log('FOUND SMS:' + value);
            });
        } else {
            console.log('CANNOT FIND ANY MATCH NUMBER IN ' + "'" + text + "'");
        }
    });
}


module.exports.startCrawl = startCrawl;
module.exports.testCrawl = testCrawl;
