const express = require('express');
const ws = require('./ws');
const app = express();
const port = process.env.PORT || 5000;
const chart = require('./utils/chartData.js');
const routes=require('./routes/index.js');
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express from express' });
});
/*
app.get('/api/addStock', (req, res) => {
    console.log("Llega a buscar la stock "+req.query.stock);
    //res.send({ express: 'Datos de stock' });
    if(!chart.checkCodeAlready(req.query.stock)){
        var response=chart.setStock(req.query.stock);
        console.log("Mando "+response);
        res.send(response);
    }

  });
*/
routes(app);
app.listen(port, () => console.log(`Listening on port ${port}`));