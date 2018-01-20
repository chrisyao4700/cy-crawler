function extractEmails (text)
{
    var emails = [];
    //var temps = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    var temps = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.com+)/gi);

    if (temps !== null){
        // temps.forEach(function (value) {
        //     if (value.indexOf('png') <0 && value.indexOf('jpg') < 0 && value.indexOf('-') < 0){
        //         emails.push(value);
        //     }
        // });
        temps.forEach(function (value) {
            emails.push(value);
        });
    }else{
        return null;
    }




    return emails;
}



module.exports.extractEmails = extractEmails;