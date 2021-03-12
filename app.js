require('dotenv').config()
const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({extended: false})
//settings
app.set('port', process.env.PORT || 5000);


//static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/createGuide', function(req,res){
    var bearer = 'Bearer ' + process.env.BEARER_TOKEN;
    try {
        fetch('https://api-test.envia.com/ship/generate/', {
        method: 'POST',
        headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"origin":{"name":"orlando gamez","company":"suministros envia","email":"orlando.gamez@envia.com","phone":"8126321667","street":"belisario dominguez","number":"2470","district":"obispado","city":"monterrey","state":"nl","category":1,"country":"MX","postalCode":"64060","reference":""},"destination":{"name":"orlando gamez","company":"suministros envia","email":"orlando.gamez@envia.com","phone":"8126321667","street":"belisario dominguez","number":"2470","district":"obispado","city":"monterrey","state":"nl","category":1,"country":"MX","postalCode":"64949","reference":""},"packages":[{"content":"prueba","amount":1,"type":"box","weight":1,"insurance":0,"declaredValue":1,"weightUnit":"KG","lengthUnit":"CM","dimensions":{"length":35,"width":30,"height":3}}],"shipment":{"carrier":"fedex","type":1,"service":"ground"},"settings":{"printFormat":"PDF","printSize":"PAPER_7X4.75","currency":"MXN"}})})
        .then(response => response.json())
        .then( data =>  res.send(data.meta));
    } catch (error) {
        res.send('Guide failed on creation');
    }
});

//start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

const socketIO = require('socket.io');
const io = socketIO(server);

var counter=0;
//websockets
io.on('connection', (socket) => {
    socket.on('create', function(room) {
        socket.join(room);
        console.log('joined room ' + socket.id)
        io.emit('getActualCounter', counter);
      });

      socket.on('updateCounter', function(data) {
        counter = counter+data.counter;  
        io.emit('updateCounter', counter);
      });
});



