// meteor-package $ meteor test-packages packages/getmeta
// see also https://themeteorchef.com/recipes/writing-a-package/


// =============================================
//   Auxiliary functions
// =============================================
var getErrorCallback = function(test, next) {
    return function(error, result) {
        test.equal(error.error, 'url-is-broken');
        test.equal(error.reason, 'GetMeta error: URL is broken');
        next();
    }
};
var getNonExistentURLCallback = function(test, next) {
    return function(error, result) {
        test.equal(error.error, 'getMeta error');
        test.equal(error.reason, 'GetMeta error: Cannot extract meta data');
        test.equal(result, undefined);
        next();
    }
};
var getTitleCallback = function(test, next) {
    return function(error, result) {
        test.equal(error, undefined);
        test.equal(result.title, 'World’s Largest Professional Network | LinkedIn');
        next();
    }
};
var getDescriptionCallback = function(test, next) {
    return function(error, result) {
        test.equal(error, undefined);
        test.equal(result.description, '400 million+ members | Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.');
        next();
    }
};


// =============================================
//   Tests
// =============================================

// 1: Mistaken URL
Tinytest.addAsync('Msg - Mistaken URL - Test 1: URL is undefined', function(test, next) {
    GetMeta(undefined, getErrorCallback(test, next));
});
Tinytest.addAsync('Msg - Mistaken URL - Test 2: URL is not String', function(test, next) {
    GetMeta(15, getErrorCallback(test, next));
});
Tinytest.addAsync('Msg - Mistaken URL - Test 3: URL is incorrect', function(test, next) {
    GetMeta('fghtd', getErrorCallback(test, next));
});

// 2: Non-Existent URL
Tinytest.addAsync('Msg - Non-Existent URL - Test 1: Title and description should be empty', function(test, next) {
    GetMeta('http://seabruspython.anywhere.com', getNonExistentURLCallback(test, next));
});

// 3: Correct URL
Tinytest.addAsync('Msg - Correct URL - Test 1: Correct title tag is returned', function(test, next) {
    GetMeta('http://linkedin.com', getTitleCallback(test, next));
});
Tinytest.addAsync('Msg - Correct URL - Test 2: Correct meta description is returned', function(test, next) {
    GetMeta('http://linkedin.com', getDescriptionCallback(test, next));
});


/*
Tinytest.add('Test 1', function(test) {
    ...
});
*/
