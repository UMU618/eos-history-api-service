const http = require('http')

http.createServer(function (req, res) {
  let buffer = req.method + ' ' + req.url + ' ' + req.httpVersion
  console.log(buffer)
  res.write(buffer + '\r\n')
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    buffer = req.rawHeaders[i] + ': ' + req.rawHeaders[i + 1]
    console.log(buffer)
    res.write(buffer + '\r\n')
  }
  res.end()
}).listen(8888)
