var rp = require('request-promise');
var db = {
    stocks: [],
    config: {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Stock Prices'
        },
        series: []
    }
}

module.exports.getDb = function () {
    return db;
}


/**
 * PROMISE A partir del stock se fija si esta en la db y devuelve los datos si es que no esta
 * @param {String} stock  el stock a buscar
 */
function searchStockData(stock) {
    return new Promise(function (resolve, reject) {
        console.log("addData de " + stock + " stocks " + db.stocks);
        if (db.stocks == undefined || !db.stocks.includes(stock)) {
            var options = {
                json: true,
                url: encodeURI(`https://api.iextrading.com/1.0/stock/${stock}/chart/1y`)
            };
            rp(options).then(function (body) {
                var dataArray = body.map(aday => ([new Date(aday.date).getTime(), aday.close]));
                console.log("Data array tiene: " + dataArray.length);
                resolve(dataArray);


            }).catch(function (err) {
                console.log("Error trayendo el stock, seguramente pq el codigo no existe, trater el error en stockService");
                reject(err);
            })
        } else {  //El stock ya esta en db
            reject(null);
        }
    })
}
function searchStockInfo(code) {
    return new Promise(function (resolve, reject) {
        var options = {
            json: true,
            url: encodeURI(`https://api.iextrading.com/1.0/stock/${code}/company`)
        };
        rp(options).then(function (body) {
            console.log("body "+JSON.stringify(body));
            console.log("DESC "+body.description);
            var aStock = {
                code: body.symbol,
                description: body.description.substring(0,100)+"...",
                name: body.companyName
            }
            db.stocks.push(aStock);
            resolve(code);
        }).catch(function (err) {
            console.log("Error " + err);
            reject(err);
        })
    })
};

function codePresent(code){
    var acum=false;
    db.stocks.forEach(function(value,index){
        console.log("comparo "+value.code.toLowerCase()+"  "+code);
        if(value.code.toLowerCase()==code)
            acum=true;
    });
    console.log("Devuelvo "+acum);
    return acum;
}
module.exports.addStock = function (stock) {
    return new Promise(function (resolve, reject) {
        console.log("AddStock " + stock);

        if(!codePresent(stock)){
            searchStockInfo(stock).then(searchStockData(stock).then(function(stockData){
                db.config.series.push({
                    name: stock.code,
                data: stockData,
                tooltip: {
                valueDecimals: 2
                    }
                });
            db.config.message={code: "success", description: "Stock added successfully"}
                resolve(db);
            }))
            .catch(function (error) {
                //Tratar el error en caso q ya este en la db o que el codigo no exista
                console.log("Error trayendo el stock, puede ser q este o que el codigo no exista: " + error);
                db.config.error={code: "nonexistent", description: "Stock code not found"}
                reject(db);
            });
        }else {
            db.config.error={code: "already", description: "Stock code already present"}
            reject(db);
        }
    })
}


module.exports.removeStock = function (stock) {
    return new Promise(function (resolve, reject) {
        if (!db.stocks.includes(stock)) {
            
            db.config.error={code: "nonexistent", description: "Stock code not found"}
            reject(db);
        } else {
            db.stocks.pop(stock);
            console.log("Voy a sacar" + stock + " " + db.config.series[0].name)
            var newSeries = db.config.series.filter(function (serie) {
                return serie.name != stock;
            })
            console.log("Nueva SERIES: " + JSON.stringify(newSeries));
            db.config.series = newSeries;
            db.config.message={code: "success", description: "Stock removed successfully"}
            resolve(db);
        }
    })
}
function getDb(stok) {
    return db;
}

