var getErrorCallback = function(test) {
    return function(error, result) {
        test.equal(error.error, 'url-is-broken');
        test.equal(error.reason, 'GetMeta error: URL is broken');
    }
};
var getNonExistentURLCallback = function(test) {
    return function(error, result) {
        test.equal(error.error, 'getMeta error');
        test.equal(error.reason, 'GetMeta error: Cannot extract meta data');
        test.equal(result, undefined);
    }
};
var getTitleCallback = function(test) {
    return function(error, result) {
        test.equal(error, undefined);
        test.equal(result.title, 'World’s Largest Professional Network | LinkedIn');
    }
};
var getDescriptionCallback = function(test) {
    return function(error, result) {
        test.equal(error, undefined);
        test.equal(result.description, '400 million+ members | Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.');
    }
};



Tinytest.add('Msg - Mistaken URL - Test 1: URL is undefined', function(test) {
    GetMeta(undefined, getErrorCallback(test));
});
Tinytest.add('Msg - Mistaken URL - Test 2: URL is not String', function(test) {
    GetMeta(15, getErrorCallback(test));
});
Tinytest.add('Msg - Mistaken URL - Test 3: URL is incorrect', function(test) {
    GetMeta('fghtd', getErrorCallback(test));
});

Tinytest.add('Msg - Non-Existent URL - Test 1: Title and description should be empty', function(test) {
    GetMeta('http://seabruspython.anywhere.com', getNonExistentURLCallback(test));
});

Tinytest.add('Msg - Correct URL - Test 1: Correct title tag is returned', function(test) {
    GetMeta('http://linkedin.com', getTitleCallback(test));
});
Tinytest.add('Msg - Correct URL - Test 2: Correct meta description content is returned', function(test) {
    GetMeta('http://linkedin.com', getDescriptionCallback(test));
});


