const express = require('express')
const app = express()
const port = 8000

const route = require('./routes/route')

var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})