GetMeta = function(url, callback) {
    Meteor.call('getMeta', url, callback);
};

/*
    if (isUrlValid === VALID_URL) {
        $('#loading-gif').show();

        Meteor.call('getTitle', url, function(error, result) {
            if (error) {
                $('#loading-gif').hide('slow');
                console.log('website-form.js--getTitle error: ' + error.reason + '. URL = ' + url);
                return;
            }

            if (result.title) {
                $('#title').val(result.title);
                $('#description').val(result.description);
            }
            $('#loading-gif').hide('slow');
        });

    } // end of "if (isUrlValid === VALID_URL)"
*/
