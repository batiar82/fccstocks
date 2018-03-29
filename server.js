const express = require('express');
const ws = require('./ws');
const app = express();
const port = process.env.PORT || 5000;

const routes=require('./routes/index.js');
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express from express' });
});
app.listen(port, () => console.log(`Listening on port ${port}`));