var WebSocket = require('ws'),
 wss = new WebSocket.Server({port: 40510});
 var stockService = require("./utils/stockService.js");
 
 wss.on('connection', function(ws){
        console.log("New conection, mando datos iiciales: ");
        //sendCurrentStocks(ws);
        //ws.send(JSON.stringify(config));
        ws.send(JSON.stringify(stockService.getDb()));
        
        
        ws.on('message', function (message){
         var pedido=JSON.parse(message);
        if(pedido.action=="add"){
            console.log("VINO "+pedido+" "+pedido.code);
                stockService.addStock(pedido.code).then(function(db){
                    console.log("Mando la db");
                    wss.clients.forEach(function each(client){
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(db));
                    }})
                }).catch(function(db){
                    console.log("Hugo algun error, mandan la db sin cambios "+db);
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