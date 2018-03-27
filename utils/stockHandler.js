var rp= require('request-promise');

function StockHandler(){
    this.addStock=function(req,res){
        var stock=req.query.stock;
        console.log("en stockhandler");
        var options = {
			encoding: null,
            url: encodeURI(`https://api.iextrading.com/1.0/stock/${stock}/chart/1y`)
		};
        rp(options).then(function(chart){
            console.log("Days: "+chart.length);
            res.json({"message":"Stock added"});   

        }).catch(function(error){
            console.log("ERror: "+error);
            res.json({"message": "Code Not Found"});
        });
        
    }
    }

module.exports= StockHandler;
