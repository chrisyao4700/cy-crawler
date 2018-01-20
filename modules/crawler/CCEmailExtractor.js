var Scraper = require("email-crawler");


function startFuck() {
    var emailscraper = new Scraper("https://github.com");
// A level is how far removed (in  terms of link clicks) a page is from the root page (only follows same domain routes)
    emailscraper.getLevels(2).then(function (emails) {
        //console.log(emails);
        emails.forEach(function (value) {
            console.log(value);
        })
    }).catch(function (reason) {
        //console.log(reason);
    });
}


module.exports.startFuck = startFuck;