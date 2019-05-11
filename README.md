# WebGet
[![NPM](https://nodei.co/npm/webget.png)](https://nodei.co/npm/webget/)

[![npm version](https://img.shields.io/npm/v/webget.svg?style=flat-square)](https://www.npmjs.org/package/webget)
[![npm license](https://img.shields.io/static/v1.svg?label=License&message=MIT&color=informational)](https://github.com/nepsho/webget/blob/master/LICENSE)
[![npm repository](https://img.shields.io/static/v1.svg?label=Repository&message=GitHub&color=yellow)](https://github.com/nepsho/webget)
[![npm author](https://img.shields.io/static/v1.svg?label=Author&message=MIT&color=success)](https://www.npmjs.com/~bcrazydreamer)

Promise and callback based website info getter through metadata of website.s
## Features
- Get any web page source code with webget
- Get any website logo, title and description
- Supports modren metatag scraping
- Fully callback and promise oriented
- Support with ES6 [async/await](https://en.wikipedia.org/wiki/Async/await)
- Support multiple metatag scraping

## Support
ES5 | ES6 | Callback | Promise |
--- | --- | --- | --- |
✔|✔|✔|✔

## Installing 
[![NPM](https://nodei.co/npm/webget.png?mini=true)](https://nodei.co/npm/webget/)

Using npm:
```bash
$ npm install webget
```

Using bower:

```bash
$ bower install webget
```

Using yarn:

```bash
$ yarn add webget
```
## Some Basic Meta Tags in HTML
```html
<meta name="description" content="Website info api"/>
<meta name="keywords" content="webget, api, nodejs"/>
<meta name="subject" content="website subject">
<meta name="copyright"content="nepsho">
<meta name="language" content="en">
<meta name="robots" content="index,follow" />
<meta name="revised" content="Saturday, May 9th, 2019, 0:00 am" />
<meta name="abstract" content="any abstract">
<meta name="topic" content="any topic">
<meta name="summary" content="any summary">
<meta name="author" content="bcrazydreamer, bcrazydreamer@gmail.com">
<meta name="designer" content="bcrazydreamer">
<meta name="reply-to" content="bcrazydreamer@gmail.com">
<meta name="url" content="https://nepsho.github.io/">
<meta name="category" content="any category">
```
## Some OpenGraph Meta Tags in HTML
```html
<meta name="og:title" content="WebGet"/>
<meta name="og:type" content="API"/>
<meta name="og:url" content="https://nepsho.github.io/"/>
<meta name="og:image" content="https://nepsho.github.io/lib/img/logo.png"/>
<meta name="og:email" content="bcrazydreamer@gmail.com"/>
<meta name="og:phone_number" content="123-456-7890"/>
```
## Examples
To get html of any webpage:
```js
const webget = require("webget")
```
```js
/* Callback method */
webget.gethtml("https://nepsho.github.io/",(data)=>{
    console.log(data);
})

/* Promise method */
webget.gethtml("https://nepsho.github.io/").then(function(data) {
	console.log(data);
}).catch(function(error) {
	console.log(error);
});

/* async/await method */
async function demo(){
    var result = await webget.gethtml("https://nepsho.github.io/");
    console.log(result);
} 

/* Sample output 
    { 
        status : true,
        html : "<html></html>"
    }
*/
```

To get meta of any webpage:
for meta request a option is required which control and specify the desired output. 
```js
var option = [
    fields; ["logo","description","title"] /*fields you want*/
];

/* Callback method */
webget.getmeta("https://nepsho.github.io/",option,(data)=>{
    console.log(data);
})

/* Promise method */
webget.getmeta("https://nepsho.github.io/",option).then(function(data){
    console.log(data)
}).catch(function(error) {
	console.log(error);
});

/* async/await method */
async function demo(){
    var result = await webget.getmeta("https://nepsho.github.io/",option);
    console.log(result);
} 

/* Sample output 
    { 
        logo : "https://nepsho.github.io/lib/img/logo.png",
        title : "NepSho",
        description : ""
    }
*/
```
In case of empty option a default option is automatically set which contain logo, title and description.
In this API both core function is designed in such way we can user as promise and as callback.

## licence
MIT [licence](https://opensource.org/licenses/MIT)

## Author
@BCrazyDreamer