var rp= require('request-promise');

var data=[];
var astock={
    name: '',
    data: data,
    tooltip: {
      valueDecimals: 2
    }
  }


function StockHandler(){
    this.addStock=function(req,res){
        var stock=req.query.stock;
        console.log("en stockhandler");
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
            res.json({"message":"Stock added",
                "chartData":  astock,
                "stocks": ["Facebook","Apple"]
        });   

        }).catch(function(error){
            console.log("ERror: "+error);
            res.json({"message": "Code Not Found"});
        });
        
    }
    }

module.exports= StockHandler;
