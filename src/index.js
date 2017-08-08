const express = require('express')
const app = express()

app.get('/:pathParam', function (req, res) {
  res.json(req.params)
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})