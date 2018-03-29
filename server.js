const express = require('express');
const ws = require('./ws');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname,'client/build')));
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express from express' });
});
app.listen(port, () => console.log(`Listening on port ${port}`));