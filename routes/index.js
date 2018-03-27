var StockHandler = require('../utils/stockHandler.js');
module.exports = function (app) {
    var stockHandler=new StockHandler();
    app.route('/api/addStock')
        .get(stockHandler.addStock);
}