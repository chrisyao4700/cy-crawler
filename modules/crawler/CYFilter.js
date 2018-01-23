function extractEmailsAndSMS(text, finish_email, finish_sms) {
    var temps_email = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.com+)/gi);
    var temps_sms = text.match(/((\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?)|(0?1[35]\d9)|(0?1[35]\d9)/gi);
    if (temps_email !== null) {
        var emails = [];
        temps_email.forEach(function (value) {
            emails.push(value);
        });
        finish_email(emails);
    } else {
        finish_email(null);
    }
    if (temps_sms !== null) {
        var numbers = [];
        temps_sms.forEach(function (value) {
            if (value !== undefined
                && value.length === 11
                && value.substr(0, 1) === '1'
                && value.indexOf('_') < 0
                && checkSecondNumber(value) === true) {
                numbers.push(value);
            }

        });
        finish_sms(numbers);
    } else {
        finish_sms(null);
    }
}

function checkSecondNumber(text) {
    if (text.substr(1, 1) !== '1'
        && text.substr(1, 1) !== '2'
        && text.substr(1, 1) !== '6'
        && text.substr(1, 1) !== '9'
        && text.substr(1, 1) !== '0') {
        return true;
    } else {
        return false;
    }
}

module.exports.extractEmailsAndSMS = extractEmailsAndSMS;