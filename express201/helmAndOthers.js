const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.post('/ajax', (req,res) => {
  console.log(req.body)
  res.send('Text')
})

app.listen(3000)
