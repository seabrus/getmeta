// ===========================================
//   Auxiliary function
// ===========================================
var validateUrl = function(url) {
    if (!url || typeof url !== 'string') { return false; }

    var urlTrimmed = url.trim();
    var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    // by Diego Perini: more at https://gist.github.com/dperini/729294 & https://mathiasbynens.be/demo/url-regex

    return urlTrimmed.match(urlRegex);
};


// ===============================================================================
//   ValidURL Match pattern
// ===============================================================================
ValidURL = Match.Where(function(x) {
    return validateUrl(x);
});


Meteor.methods({
  // ===============================================================================
  //   Retrieve the title tag and meta description from a website with a specified URL
  // ===============================================================================
    getMeta: function(url) {
        //if (this.userId  &&  Match.test(url, ValidURL)) {
        if (Match.test(url, ValidURL)) {
            var response = null;
            var websiteInfo = {title: '', description: ''};

            var titleReg = /<title[^>]*>[\s\S]*<\/title>/i;
            var titleTextReg = />[^<]*</i;
            var descriptionReg = /<meta[^>]*name=(['"]?)description\1[^>]*?>/i;
            var contentReg = /content=(['"])[\s\S]*?\1/i;

            try {
                response = HTTP.get(url, {timeout: 3000});

                if (response && response.content) {
                    var isTitle = response.content.match(titleReg);
                    if (isTitle) {
                        var isTitleText = isTitle[0].match(titleTextReg);
                        if (isTitleText) {
                            var title = isTitleText[0].slice('>'.length, -1);
                            websiteInfo.title = title.trim();
                        }
                    }

                    var isDescription = response.content.match(descriptionReg);
                    if (isDescription) {
                        var isContent = isDescription[0].match(contentReg);
                        if (isContent) {
                            var content = isContent[0].slice('content="'.length, -1);
                            websiteInfo.description = content.trim();
                        }
                    }
                } // end of "if (response.content)..."

                response = null;
                return websiteInfo;
            }
            catch(e) {
                console.log('GetMeta - server-side error: ' + e.message + '; URL = ' + url);
                throw new Meteor.Error('getMeta error', 'GetMeta error: Cannot extract meta data');
            } // end of "try-catch" block

        } else {
            console.log( 'GetMeta - server-side error: URL is broken' );
            throw new Meteor.Error('url-is-broken', 'GetMeta error: URL is broken');
        } // end of "if (Match.test(url, ValidURL))..."

    },
});

DDPRateLimiter.addRule({
        type: 'method',
        name: 'getMeta',
        connectionId: function() { return true; }   // Rate limit per connection ID
    }, 
    5, 
    1000
);
