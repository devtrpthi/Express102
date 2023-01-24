const path = require('path')
const express = require('express')
const app = express()

const helmet = require('helmet')
app.use(helmet())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.get('/', (req,res) => {
  res.send('lol!')
})

app.get('/login', (req,res,next) => {
  res.render('login')
})

app.post('/process_login', (req,res,next) => {
  const username = req.body.username
  const password = req.body.password
  if(password == 'x') {
    res.cookie('username', username)

    res.redirect('/welcome')    
  } else {
    res.redirect('/login?msg=fail')
  }
 // res.json(req.body)
})

app.get('/welcome', (req,res,next) =>{
  res.render('welcome' ,{
    username: req.cookies.username
})
})

app.get('/logout', (req,res,next) => {
  res.clearCookie('username')
  res.redirect('/login')
})

app.listen(3000)
