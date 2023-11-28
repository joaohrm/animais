var express = require('express');
var router = express.Router();
var port = 3000;
var app = express();

router.get('/src/index.htm')

app.use(express.static(__dirname + '/src'));


app.get('/', (req, res) => {
    console.log(res);
    res.send('Hello World!')
});


app.listen(port, function(){
    console.log('server up and running! ' + port);
});