var http = require('http')
var fs = require('fs')

var server = http.createServer()
server.on('request', getCss)
server.listen(8080)
console.log('Server running …')

function getCss(req, res) {
  var url = req.url
  console.log('url=', url)
  if ('/' == url) {
    fs.readFile('./index.html', 'UTF-8', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
  } else if ('/style.css' == url) {
    fs.readFile('./style.css', 'UTF-8', function (err, data) {
      console.log('style.css is read.')
      res.writeHead(200, { 'Content-Type': 'text/css' })
      res.write(data)
      res.end()
    })
  } else {
    console.log('unexpected url...')
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    const responseMessage = '<h1>Hello World</h1>'
    res.end(responseMessage)
  }
}
