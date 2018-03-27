var rp = require('request-promise');
var info=[];
var stocks= [{
    label: 'Facebook',
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
    data: [65, 59, 80, 81, 56, 55, 40]
    },{
    label: 'Facebook',
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
    data: [80, 45, 20, 91, 56, 25, 80]
    }
    ];
var companies=["pepe"];
module.exports= {
    getInfo: function(){
        return info;
    },
    getStocks: function(){ 
        console.log(stocks);
        return stocks},
    getStock: stocks,
    setStock: function(stock){
        var options = {
			encoding: null,
            url: encodeURI(`https://api.iextrading.com/1.0/stock/${stock}/chart/1y`)
            //url: encodeURI(`https://api.iextrading.com/1.0/stock/${stock}/company`)
		};
        rp(options).then(function(chart){
            console.log("Days: "+chart.length);
            companies.push(stock);
            var company={
                name: stock,
                chart: chart
            }
            info.push(company);
            return {"message":"Stock added"};   

        }).catch(function(error){
            console.log("ERror: "+error);
            return {"message": "Code Not Found"}
        });
        
    },
    checkCodeAlready: function(code){
        console.log("Companes "+companies);
        return companies!==null && companies.includes(code);
    }
}