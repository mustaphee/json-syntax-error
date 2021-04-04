# json-syntax-error
>  Middleware to help you to resolve syntax errors in your express server

Ever tried sending an invalid JSON syntax to your express server when you use it with body-parser
or `express.json()` and you get an ugly error at your client side?

Tired of seeing your server throwing Syntax error when an invalid JSON data is forced
down it's throat? 

```html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>SyntaxError: Unexpected string in JSON at position 53<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at parse (/home/touchcore/Desktop/TC/tc-back-office/node_modules/body-parser/lib/types/json.js:89:19)<br> &nbsp; &nbsp;at /home/touchcore/Desktop/TC/tc-back-office/node_modules/body-parser/lib/read.js:121:18<br> &nbsp; &nbsp;at invokeCallback (/home/touchcore/Desktop/TC/tc-back-office/node_modules/raw-body/index.js:224:16)<br> &nbsp; &nbsp;at done (/home/touchcore/Desktop/TC/tc-back-office/node_modules/raw-body/index.js:213:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/home/touchcore/Desktop/TC/tc-back-office/node_modules/raw-body/index.js:273:7)<br> &nbsp; &nbsp;at IncomingMessage.emit (events.js:327:22)<br> &nbsp; &nbsp;at endReadableNT (_stream_readable.js:1220:12)<br> &nbsp; &nbsp;at processTicksAndRejections (internal/process/task_queues.js:84:21)</pre>
</body>
</html>
```

 This small middleware will help you to resolve syntax errors in your express server by 
 allowing you to catch the error early and returning a cleaner error

 ```json
 {
    "status": "fail",
    "message": "Invalid JSON: The server is unable to process your request as it is badly malformed!
 }

 ```

## Installing / Getting started

Install via npm

```shell
npm install json-syntax-error --save
```

Configuration is easy, as ac b, c. Just `require('json-syntax-error')` anywhere below your json parser (`express.json()` or `bodyParser.json()`)

```js

const JSONSyntaxErr =  require('json-syntax-error')
...
const app = express();
...
app.use(express.json());
app.use(JSONSyntaxErr()); // That's all, really!

...
```

You can also pass in your custom response. It can be JSON, HTML, text or any format allowed by express `.send()`

```js
app.use(JSONSyntaxErr({ error: 'Why are you sending a bad json?' })); // Torture their conscience!

```
or

```js
app.use(JSONSyntaxErr('<p>Really? A bad JSON? Really?</p>')); // Wasn't hard, was it?!

```

## Tests

```shell
npm test
```
