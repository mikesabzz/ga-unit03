const http = require('http')
const moment = require('moment')

http.createServer((req, res) => {
  if (req.url === '/time') {
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({'time': time}))
    res.end()
  }

  if (req.url === '/greet') {
    if (req.method === 'POST') {
      req.on('data', (data) => {
        const body = JSON.parse(data.toString())

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({'greeting': `Hello, ${body.name}`}))
        res.end()
      })
    }
  }
}).listen(3000, () => {
  console.log('Server is up and running on port 3000')
})