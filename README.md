#GetMeta

GetMeta is a [Meteor](https://www.meteor.com/) package that extracts `title` and `description` tags content from a website with a specified URL.

###How to Install
To add this package to your app use the command:
```
meteor add seabrus:getmeta
```

###Usage

Just call `GetMeta(url, callback)` on the client. 

The argument `url` should be a valid URL. 
The `callback` function has two arguments -- `error` and `result`: 
- `error` is an instance of the standard `Meteor.Error` object; 
- `result` is an object with two keys: `title` and `description`.

Here is an example:
```javascript
'blur #url': function(event, instance) {
  var url = event.target.value.trim();
  var isUrlValid = validateUrl(url); // make some actions to validate URL 

  if (isUrlValid === VALID_URL) {
    instance.$('#loading-gif').show();
    ...
    GetMeta(url, function(error, result) {
      instance.$('#loading-gif').hide('slow');

      if (error) {
        console.log(error.reason + '.\nURL = ' + url);
        return;
      }

      if (result.title) {
        instance.$('#title').val(result.title);
        instance.$('#description').val(result.description);
      }
    });
  }
}
```

This code will run on the event `blur` when it happens for the input with a website address. It gets the `url` value, validates it, shows an animated gif to indicate that loading is in progress, and calls the `GetMeta()` function.

The function `validateUrl(url)` is given just for an example, it is not part of the package.

###Note 1
Please note that `timeout` for the request to the website specified by `url` is now set to 3000 ms. If no response is got during this time, an error will be thrown and the `result` will be `underfind`.

###Note 2
The package prevents attempts to flood it with traffic and limits the number of calls to 5 per second. 
