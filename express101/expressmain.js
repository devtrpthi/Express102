const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('/',(req,res) => {
  res.sendFile(path.join(__dirname + '/body.html'))
})

app.listen(3000, () => {
  console.log('server listening to port 3000')
})
