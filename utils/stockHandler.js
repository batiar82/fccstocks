var rp= require('request-promise');

var data=[];
var mockSerie={
    name: '',
    data: data,
    tooltip: {
      valueDecimals: 2
    }
  }
var stocks;/*={
    config={
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'Stock Prices'
        },
        series:[]
      }


}*/

function StockHandler(ws){
    this.sendCurrentStocks=function(){
        return null;
    }
    this.addStock=function(stock){
        console.log("en stockhandler "+stock);
        var options = {
            //encoding: null,
            json: true,
            url: encodeURI(`https://api.iextrading.com/1.0/stock/${stock}/chart/1y`)
		};
        rp(options).then(function(chart){
            console.log(JSON.stringify(chart));
            data=chart.map(aday=>([new Date(aday.date).getTime(),aday.close]));
            astock.name=stock;
            astock.data=data;
            console.log("Devuelvo config: "+JSON.stringify(astock.data[0]));
            ws.send({message: 'Stock added',config:  astock,})
        }).catch(function(error){
            console.log("ERror: "+error);
            return {message: "Code Not Found"};
        });
        
    }
    }

module.exports= StockHandler;
