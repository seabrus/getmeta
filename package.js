Package.describe({
    name: 'seabrus:getmeta',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Gets title and meta tags content for a website with specified URL',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use(['http@1.0.0', 'check@1.0.0', 'ddp-rate-limiter@1.0.0'], 'server');
    api.export('GetMeta', 'client');
    api.addFiles('client/getmeta-client.js', 'client');
    api.addFiles('server/getmeta-server.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('seabrus:getmeta');
  api.addFiles('getmeta-tests.js', 'client');
});
