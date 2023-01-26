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

app.use((req,res,next) => {
  if(req.query.msg == 'fail'){
    res.locals.msg = 'This pass and username combo does not exist'
  } else {
    res.locals.msg = ``
  }
  next()
})


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

app.param('id',(req,res,next,id) => {
  console.log('Params called:' ,id)
  next()
})


app.get('/story/:storyId', (req,res,next) => {
  res.send(`<h1>Story is ${req.params.storyId} </h1>`)
})

app.get('/story/:storyId/:link',(req,res,next) => {
  res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)
})

app.get('/logout', (req,res,next) => {
  res.clearCookie('username')
  res.redirect('/login')
})

app.listen(3000)
console.log('server is listening u dumb fuck')
