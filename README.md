#GetMeta

This [Meteor](https://www.meteor.com/) package extracts `title` and `description` tags content from a website with a specified URL.

###Usage###

Just call `GetMeta(url, callback)` on the client. 

The `callback` function should have arguments `error` and `result`: 
- `error` is an instance of the standard `Meteor.Error` object 
- `result` is an object with two keys: `title` and `description`

Here is an example:
```javascript
'blur #url': function(event, instance) {
  var url = event.target.value.trim();
  var isUrlValid = validateUrl(url);

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
