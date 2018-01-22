function extractEmails (text)
 {
   var emails = [];
  // var temps = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
   var temps = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.com+)/gi);

     if (temps !== null){
          temps.forEach(function (value) {
            if (value.indexOf('png') <0 && value.indexOf('jpg') < 0 && value.indexOf('-') < 0){
               emails.push(value);
             }
          });
         temps.forEach(function (value) {
             emails.push(value);
         });
     }else{
         return null;
   }

     return emails;
 }

function extractNumbers(text)
{

    console.log(text);
    var numbers = [];
    //var temps = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    var temps = text.match(/^1[3|4|5|7|8][0-9]{9}$/g);
    if (temps !== null){
        // temps.forEach(function (value) {
        //     if (value.indexOf('png') <0 && value.indexOf('jpg') < 0 && value.indexOf('-') < 0){
        //         emails.push(value);
        //     }
        // });
        temps.forEach(function (value) {
            numbers.push(value);
        });
        //console.log('We got a match!!!');
    }else{
        return null;
    }
    return numbers;

}


module.exports.extractNumbers = extractNumbers;
module.exports.extractEmails = extractEmails;