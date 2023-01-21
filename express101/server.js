const http = require('http')
const fs = require('fs')

const  server = http.createServer((req,res) => {
  //console.log(req)
  if(req.url == '/') {
  res.writeHead(200,{'content-type': 'text/html'})
  //res.write('<h1> Hello world!</h1>')
  const homePage = fs.readFileSync('./body.html')
  res.write(homePage)
  res.end()
   } else if(req.url == '/download.png') {
  res.writeHead(200,{'content-type': 'text/html'})
  //res.write('<h1> Hello world!</h1>')
  const homePage = fs.readFileSync('./download.png')
  res.write(homePage)
  res.end()
  }else if(req.url == '/styles.css') {
  res.writeHead(200,{'content-type': 'text/css'})
  //res.write('<h1> Hello world!</h1>')
  const homePage = fs.readFileSync('./styles.css')
  res.write(homePage)
  res.end()
  }
  else {
  res.writeHead(404,{'content-type': 'text/html'})
  res.write('<h1> The page u are looking for is not available!</h1>')
  res.end()
  }
  })

server.listen(3000)
