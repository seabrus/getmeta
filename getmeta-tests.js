var getErrorCallback = function(test) {
    return function(error, result) {
        test.equal(error.error, 'url-is-broken');
        test.equal(error.reason, 'GetMeta error: URL is broken');
    }
};
var getResultCallback = function(test) {
    return function(error, result) {
        test.equal(error, undefined);
        test.equal(result.title, 'World’s Largest Professional Network | LinkedIn');
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

Tinytest.add('Msg - Correct URL - Test 1: Title is correct', function(test) {
    GetMeta('http://linkedin.com', getResultCallback(test));
});
