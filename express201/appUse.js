const express = require('express')
const app = express()

// Middleware has routers and access to req,res,next objects
function validateUser(req,res,next) {
  res.locals.validateduser = true
  console.log('yayyy!!!')
  next()  //to pass on to other Middleware
}

// all these methods are middleware only which forms the framework

app.use('/',validateUser)

app.get('/', (req,res) => {
  res.send('<h1>Main page</h1>')
})

app.get('/admin', (req,res) => {
  res.send('<h1> Admin page</h1>')
})

app.listen(3000)
console.log('litening to port')
