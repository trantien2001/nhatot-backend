const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 8000;
const route = require('./routes/route');
var cors = require('cors');

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
