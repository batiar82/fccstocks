var rp= require('request-promise');

var chartData={
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
    datasets: [
      {
        label: 'Apple',
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
        data: [65, 59, 80, 81, 56, 55, 40,80]
      }, 
      {
        label: 'facebook',
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
        data: [55, 19, 110, 31, 86, 15, 20,30]
      }



        ]
      }



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
            res.json({"message":"Stock added",
                "chartData":  chartData,
                "stocks": ["Facebook","Apple"]
        });   

        }).catch(function(error){
            console.log("ERror: "+error);
            res.json({"message": "Code Not Found"});
        });
        
    }
    }

module.exports= StockHandler;
