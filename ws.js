console.log("En WS.js");

var WebSocketServer = require('ws').Server,
 wss = new WebSocketServer({port: 40510});

 const chart = require('./utils/chartData.js');
//Test
var stocks={
        stocks: ['Facebook'],
        chartData:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,                  
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
           pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40,80,55,22,66,88,99]
          }
            ]
          }
        }
 //console.log("CHART "+chart.getStock);
 wss.on('connection', function(ws){
        console.log("New conection, mando datos iiciales: "+stocks.chartData.datasets.length);
        ws.send(JSON.stringify(stocks));

     ws.on('message', function (message){
         console.log('received: %s', message);

     })
     /*setInterval(()=> ws.send(`${new Date()}`,
        function ack(err){
            //Capturo error al enviar
            if(err){
                console.log("ERROR AL TRATAR DE MANDAR");
                ws.close;
            }
        }
    ), 1000)*/
     //console.log(chart.getStock.length);
     //setInterval(()=> ws.send(`${chart.getStock}`), 5000)
 })
