console.log("En WS.js");
var WebSocketServer = require('ws').Server,
 wss = new WebSocketServer({port: 40510});

 const chart = require('./utils/chartData.js');
//console.log("CHART "+chart.getStock);
 wss.on('connection', function(ws){
     ws.on('message', function (message){
         console.log('received: %s', message)
     })
     setInterval(()=> ws.send(`${new Date()}`), 1000)
     //console.log(chart.getStock.length);
     //setInterval(()=> ws.send(`${chart.getStock}`), 5000)
 })
