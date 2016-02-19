GetMeta = function(url, callback) {
    if (!url) {
        console.log('GetMeta, client-side: The argument "url" is absent but required. Execution is stopped');
        return 'The argument "url" is required';
    }
    if (typeof url !== 'string') {
        console.log('GetMeta, client-side: The argument "url" is not a String. Execution is stopped');
        return 'The argument "url" is not a String';
    }
    if (typeof callback !== 'function') {
        console.log('GetMeta, client-side: The argument  "callback" is not a function. Execution is stopped.');
        return 'The argument "callback" is not a function';
    }

    Meteor.call('getMeta', url, callback);
};
