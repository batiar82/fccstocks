const express = require('express');
//const ws = require('./ws');
const app = express();
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const port = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname,'client/build')));
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express from express'+req.hostname });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({server: server });


var stockService = require("./utils/stockService.js");
 
 wss.on('connection', function(ws){
        console.log("New conection, mando datos iiciales: ");
        ws.send(JSON.stringify(stockService.getDb()));
        
        
        ws.on('message', function (message){
         var pedido=JSON.parse(message);
        if(pedido.action=="add"){
            console.log("VINO "+pedido+" "+pedido.code);
                stockService.addStock(pedido.code).then(function(db){
                
                    wss.clients.forEach(function each(client){
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(db));
                    }})
                }).catch(function(db){
                    ws.send(JSON.stringify(db));
                });

        }else{
            stockService.removeStock(pedido.code).then(function(db){
                console.log("mando la db");
                wss.clients.forEach(function each(client){
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(db));
                }})
            }).catch(function(db){
                console.log("Hubo error al borrar, mandan db original");
                ws.send(JSON.stringify(db));
            })
        }});
    })





server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port+" "+server.address());
  });
//app.listen(port, () => console.log(`Listening on port ${port}`));