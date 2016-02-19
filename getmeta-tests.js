// meteor-package $ meteor test-packages packages/getmeta
// see also https://themeteorchef.com/recipes/writing-a-package/


// =============================================
// 1: Mistaken URL
// =============================================
Tinytest.add('Msg - Mistaken URL - Test 1: URL is undefined', function(test) {
    var result = GetMeta();
    test.equal(result, 'The argument "url" is required');
});
Tinytest.add('Msg - Mistaken URL - Test 2: URL is not String', function(test) {
    var result = GetMeta( {x: 12} );
    test.equal(result, 'The argument "url" is not a String');
});

Tinytest.addAsync('Msg - Mistaken URL - Test 3: URL is incorrect', function(test, next) {
    var callback = function(error, result) {
        test.equal(error.error, 'url-is-incorrect');
        test.equal(error.reason, 'GetMeta error: URL is incorrect');
        next();
    };

    GetMeta('fghtd//www', callback);
});


// =============================================
// 2: Non-Existent URL
// =============================================
Tinytest.addAsync('Msg - Non-Existent URL - Test 1: Title and description should be undefined', function(test, next) {
    var callback = function(error, result) {
        test.equal(error.error, 'getmeta-error');
        test.equal(error.reason, 'GetMeta error: Cannot extract meta data');
        test.equal(result, undefined);
        next();
    };

    GetMeta('http://seabruspython.anywhere.com', callback);
});


// =============================================
// 3: Correct and existing URL
// =============================================
Tinytest.addAsync('Msg - Correct URL - Test 1: Correct title and description should be returned', function(test, next) {
    var callback = function(error, result) {
        test.equal(error, undefined);
        test.equal(result.title, 'World’s Largest Professional Network | LinkedIn');
        test.equal(result.description, '400 million+ members | Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.');
        next();
    };

    GetMeta('http://linkedin.com', callback);
});


// =============================================
// 4: Wrong callback
// =============================================
Tinytest.add('Msg - Wrong callback - Test 1: Execution should be stopped on client', function(test) {
    var result = GetMeta('http://linkedin.com');
    test.equal(result, 'The argument "callback" is not a function');
});



/*
var getErrorCallback = function(test, next) {
    return function(error, result) {
        test.equal(error.error, 'url-is-incorrect');
        test.equal(error.reason, 'GetMeta error: URL is incorrect');
        next();
    }
};

Tinytest.addAsync('Msg - Mistaken URL - Test 1: URL is undefined', function(test, next) {
    GetMeta(undefined, getErrorCallback(test, next));
});
Tinytest.addAsync('Msg - Mistaken URL - Test 2: URL is not String', function(test, next) {
    GetMeta(15, getErrorCallback(test, next));
});
Tinytest.addAsync('Msg - Mistaken URL - Test 3: URL is incorrect', function(test, next) {
    GetMeta('fghtd', getErrorCallback(test, next));
});
*/
